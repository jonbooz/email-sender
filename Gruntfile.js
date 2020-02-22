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
            },
            web: {
                options: {
                    bucket: 'email-sender-code-us-west-2-888557227313'
                },
                files: [
                    {
                        cwd: 'build/',
                        expand: true,
                        src: ['web.zip'],
                        dest: '/'
                    }
                ]
            }
        },

        jshint: {
            gruntfile: "Gruntfile.js",
            src: ["sender/**/*.js"],
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
                    {expand: true, cwd: 'build/tsc/sender/', src: ['**/*.js'], dest: 'build/email-sender/'},
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
            },

            web_get_deps: {
                cmd: 'go get'
            },
            web_compile_local: {
                cmd: 'go build -o build/web'
            },
            web_compile_remote: {
                cmd: 'GOOS=linux go build -o build/web'
            },
            web_update_lambda_code: {
                cmd: 'aws lambda update-function-code --function-name "email-sender-webAppLambda-19QFTSZVHLLG9" --s3-bucket "email-sender-code-us-west-2-888557227313" --s3-key "web.zip"'
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
            },
            web: {
                options: {
                    archive: 'build/web.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['web'],
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
    grunt.registerTask('sender-upload', ['compress:sender', 'aws_s3:sender', 'exec:sender_update_lambda_code']);
    grunt.registerTask('sender', ['sender-dist', 'sender-upload']);

    // The API build scripts
    grunt.registerTask('web-deps', ['exec:web_get_deps']);
    grunt.registerTask('web-release', ['clean', 'web-deps', 'exec:web_compile_remote']);
    grunt.registerTask('web-upload', ['compress:web', 'aws_s3:web', 'exec:web_update_lambda_code']);
    grunt.registerTask('web', ['web-release', 'web-upload']);

    // Default task(s).
    grunt.registerTask('default', ['sender', 'web']);

};
