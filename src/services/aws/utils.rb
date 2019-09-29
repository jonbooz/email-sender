require 'aws-sdk'

class AwsUtils
    DEFAULT_PROFILE = 'default'
    DEFAULT_REGION = 'us-west-2'

    def self.configure provide_credentials = false, region = 'us-west-2', profile = 'default'
        config_params = {
            region: region
        }

        if provide_credentials
            credentials = Aws::SharedIniFileCredentials(profile: profile)
            config_params[:credentials] = credentials
        end

        Aws.config.update(config_params)

    end

end
