class Credentials

  def initialize(ddb, cf, kms)
    @ddb = ddb
    @cf = cf
    @kms = kms

    @resources = @cf.list_resources 'credentials'
  end

  def read credential_name
    credential_key = {
      name: credential_name
    }
    read_value = @ddb.read(@resources['credentialsTable'], credential_key)
    return @kms.decrypt(read_value['value'])
  end
end
