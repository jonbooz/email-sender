require 'aws-sdk-cloudformation'

class CloudFormation

  def initialize
    @cf = Aws::CloudFormation::Client.new
    @resources = { }
  end

  def list_resources(stack_name)
    unless @resources.key? stack_name
      params = {
        stack_name: stack_name
      }

      begin
        resp = @cf.describe_stack_resources params
        resource_list = resp.stack_resources.map { |r| [r.logical_resource_id, r.physical_resource_id] }
        @resources[stack_name] = Hash[resource_list]
      rescue Aws::CloudFormation::Errors::ServiceError => error
        puts 'Unable to get resources for stack ' + stack_name + ': ' + error.message
      end
    end

    @resources[stack_name]
  end
end
