require './src/config/modules'
require './src/utils/hashable'

class ActiveRecord < Hashable
  ## Requires instance methods:
  #
  # * table: the name of the table the record is stored in
  # * key_name: the name of the key for the db identifier
  # * is_valid : this should be overridden if validation is required

  def self.table_name(table)
    @table = Modules.resources[table]
  end

  def self.key_name(key)
    @key = key
  end

  def self.is_valid?
    true
  end

  def save
    if is_valid?
      Modules.get_dynamodb.save(@table, to_hash)
    end
  end

  def self.get(id)
    key = { }
    key[@key] = id
    item = Modules.get_dynamodb.read(@table, key)
    item_to_instance item
  end

  def self.begins_with(name, value)
    expression = 'begins_with(#n, :v1)'
    values = {':v1': value}
    names = {'#n': name}
    Modules.get_dynamodb.scan(@table, expression, values, names)
        .map { |i| item_to_instance i }
  end

  private
  def self.item_to_instance(item)
    instance = self.new
    instance.methods.map {|m| m.to_s }
        .select { |m| m.end_with? "=" and not m.end_with? "==" and m != '!='}
        .map { |m| m[0..-2]  }
        .each { |a| instance.send("#{a}=", item[a]) }
    instance
  end
end