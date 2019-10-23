module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cloudformation: {
            options: {
                region: 'us-west-2'
            },
            createStack: {
                action: 'create-stack',
                stackName: 'email-sender-node',
                deleteIfExists: false,
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloudFormation/bootstrap.json']
            },
            updateStack: {
                action: 'update-stack',
                stackName: 'email-sender-node',
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloudFormation/email-sender.json']
            }
        },

        aws_s3: {
            dist: {
                options: {
                    bucket: 'email-sender-node-code-us-west-2-888557227313'
                },
                files: [
                    {
                        cwd: 'build/',
                        expand: true,
                        src: ['email-sender.zip'],
                        dest: '/'
                    }
                ]
            },
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
            tsc: {
                cmd: 'tsc'
            },
            install_modules: {
                cwd: 'build/',
                cmd: 'npm install --production'
            }
        },
        compress: {
            options_package: {
                options: {
                    archive: 'build/email-sender.zip'
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

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('js', ['test', 'exec:tsc', 'copy:js']);
    grunt.registerTask('dist', ['clean', 'js', 'exec:install_modules', 'copy:modules']);
    grunt.registerTask('upload', ['compress', 'aws_s3:dist']);

    // Default task(s).
    grunt.registerTask('default', ['dist', 'upload']);
    grunt.registerTask('debug', ['test', 'js']);

};
