require './src/models/active_record'

class EmailModule < ActiveRecord
  attr_accessor :id, :entries, :format, :heading

  table_name "modulesTable"
  key_name "id"

  def self.is_valid?
    id.match(/\w+\/\w+/) and entries.is_a?(Array)
  end

end