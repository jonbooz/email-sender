module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cloudformation: {
            options: {
                region: 'us-west-2'
            },
            createStack: {
                action: 'create-stack',
                stackName: 'email-sender',
                deleteIfExists: false,
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloudFormation/bootstrap.json']
            },
            updateStack: {
                action: 'update-stack',
                stackName: 'email-sender',
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloudFormation/email-sender.json']
            }
        },

        aws_s3: {
            sender: {
                options: {
                    bucket: 'email-sender-code-us-west-2-888557227313'
                },
                files: [
                    {
                        cwd: 'build/',
                        expand: true,
                        src: ['sender.zip'],
                        dest: '/'
                    }
                ]
            }
        },

        jshint: {
            gruntfile: "Gruntfile.js",
            src: ["src/**/*.js"],
            options: {
                esversion: 8,
                node: true,
                '-W053': true,
                '-W083': true
            }
        },

        copy: {
            js: {
                files: [
                    {expand: true, cwd: 'build/tsc/src/', src: ['**/*.js'], dest: 'build/email-sender/'},
                    {expand: true, src: ['package.json'], dest: 'build/'}
                ]
            },
            modules: {
                files: [
                    {expand: true, cwd: 'build', src: ['node_modules/**'], dest: 'build/email-sender/'}
                ]
            }
        },

        exec: {
            sender_tsc: {
                cmd: 'tsc'
            },
            sender_tests: {
                cmd: 'npm run just-test'
            },
            sender_install_modules: {
                cwd: 'build/',
                cmd: 'npm install --production'
            },
            sender_update_lambda_code: {
                cmd: 'aws lambda update-function-code --function-name "email-sender-emailSenderLambda-V8HPWNN7JL6D" --s3-bucket "email-sender-code-us-west-2-888557227313" --s3-key "sender.zip"'
            }
        },

        compress: {
            sender: {
                options: {
                    archive: 'build/sender.zip'
                },
                expand: true,
                cwd: 'build/email-sender/',
                src: ['**/*'],
                dest: '/'
            }
        },

        clean: ['build/']
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-aws-cloudformation');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('create-stack', ['cloudformation:createStack', 'dist', 'upload', 'cloudformation:updateStack']);
    grunt.registerTask('update-stack', ['cloudformation:updateStack']);

    // The Sender build scripts
    grunt.registerTask('sender-test', ['jshint']);
    grunt.registerTask('sender-js', ['sender-test', 'exec:sender_tsc', 'exec:sender_tests', 'copy:js']);
    grunt.registerTask('sender-dist', ['clean', 'sender-js', 'exec:sender_install_modules', 'copy:modules']);
    grunt.registerTask('sender-upload', ['compress:sender', 'aws_s3:sender']);
    grunt.registerTask('sender-upload-and-set', ['sender-upload', 'exec:sender_update_lambda_code']);
    grunt.registerTask('sender', ['sender-dist', 'sender-upload-and-set']);

    // By operation
    grunt.registerTask('dist', ['sender-dist']);
    grunt.registerTask('upload', ['sender-upload']);
    grunt.registerTask('upload-and-set', ['sender-upload-and-set']);

    // Default task(s).
    grunt.registerTask('default', ['sender']);

};
