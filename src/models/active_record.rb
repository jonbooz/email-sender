require './src/config/modules'
require './src/utils/hashable'

class ActiveRecord < Hashable
  ## Requires instance methods:
  #
  # * is_valid : this should be overridden if validation is required

  def is_valid?
    true
  end

  def save
    if is_valid?
      Modules.get_dynamodb.save(table, to_hash)
    end
  end

  def self.get(id)
    key = { }
    key['id'] = id
    item = Modules.get_dynamodb.read(table, key)
    item_to_instance item
  end

  def self.begins_with(name, value)
    expression = 'begins_with(#n, :v1)'
    values = {':v1': value}
    names = {'#n': name}
    Modules.get_dynamodb.scan(table, expression, values, names)
        .map { |i| item_to_instance i }
  end

  private

  def self.table
    puts self.name
    Modules.resources[self.name + 'Table']
  end

  def table
    Modules.resources[self.class.to_s + 'Table']
  end

  def self.item_to_instance(item)
    instance = self.new
    instance.methods.map {|m| m.to_s }
        .select { |m| m.end_with? "=" and not m.end_with? "==" and m != '!='}
        .map { |m| m[0..-2]  }
        .each { |a| instance.send("#{a}=", item[a]) }
    instance
  end
end