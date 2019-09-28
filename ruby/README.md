
To run bundle to install deps:

    bundle install --path vendor/bundle

To build code package everything:

    mkdir -p build/
    cp -r src/* build/
    bundle install --without test --path build/vendor/bundle


To update a lambda's code

    aws lambda update-function-code --function-name my-function --zip-file fileb://function.zip
