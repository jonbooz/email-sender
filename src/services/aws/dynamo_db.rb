require 'aws-sdk-dynamodb'

class DynamoDb

  def initialize(client)
    @ddb = client
  end

  ##
  # Save the given hash to DynamoDB
  #
  # This method will convert the hash into an appropriate
  # DynamoDB object, making assumptions about the DDB types
  # based on the type of the ruby data.
  #
  # This conversion will hold to the contract:
  #
  # `x == read save x`
  #
  # and
  #
  # `y = save read y`
  #
  # where `x` is the hash and `y` is the DDB object.
  #
  def save(table, item)
    params = {
      table_name: table,
      item: item
    }

    begin
      return @ddb.put_item params
    rescue Aws::DynamoDB::Errors::ServiceError => error
      puts 'Unable to save item: ' + error.message
    end
  end

  def read(table, key)
    params = {
      table_name: table,
      key: key
    }

    begin
      return (@ddb.get_item params).item
    rescue Aws::DynamoDB::Errors::ServiceError => error
      puts 'Unable to read item: ' + error.message
    end
  end

  def scan(table, expression, values, names = nil)
    params = {
      table_name: table,
      filter_expression: expression,
      expression_attribute_values: values
    }
    unless names.nil?
      params[:expression_attribute_names] = names
    end

    begin
      return (@ddb.scan params).items
    rescue Aws::DynamoDB::Errors::ServiceError => error
      puts 'Unable to scan items: ' + error.message
    end

  end

end
