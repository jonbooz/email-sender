module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cloudformation: {
            options: {
                region: 'us-west-2'
            },
            createStack: {
                action: 'create-stack',
                stackName: 'go-email-sender',
                deleteIfExists: false,
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloud_formation/bootstrap.json']
            },
            updateStack: {
                action: 'update-stack',
                stackName: 'go-email-sender',
                capabilities: ['CAPABILITY_IAM'],
                src: ['cloud_formation/email-sender.json']
            }
        },

        aws_s3: {
            dist: {
                options: {
                    bucket: 'email-sender-go-code-us-west-2-888557227313'
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

        exec: {
            get_deps: {
                cmd: 'go get github.com/aws/aws-lambda-go/lambda'
            },
            compile_local: {
                cmd: 'go build -o build/main'
            },
            compile_remote: {
                cmd: 'GOOS=linux go build -o build/main'
            },
            update_lambda_code: {
                cmd: 'aws lambda update-function-code --function-name "email-sender-emailSenderLambda-V8HPWNN7JL6D" --s3-bucket "email-sender-go-code-us-west-2-888557227313" --s3-key "email-sender.zip"'
            }
        },
        compress: {
            options_package: {
                options: {
                    archive: 'build/email-sender.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['main'],
                dest: '/'
            }
        },
        clean: ['build/']
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-aws-cloudformation');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('create-stack', ['cloudformation:createStack', 'release', 'upload', 'cloudformation:updateStack']);
    grunt.registerTask('update-stack', ['cloudformation:updateStack']);

    grunt.registerTask('deps', ['exec:get_deps']);
    grunt.registerTask('release', ['clean', 'deps', 'exec:compile_remote']);
    grunt.registerTask('upload', ['compress', 'aws_s3:dist', 'exec:update_lambda_code']);

    // Default task(s).
    grunt.registerTask('default', ['release', 'upload']);
    grunt.registerTask('debug', ['clean', 'deps', 'exec:compile_local']);

};
