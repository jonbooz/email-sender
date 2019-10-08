require './src/models/active_record'

class EmailModule < ActiveRecord

  attr_accessor :id, :entries, :heading, :format

  def is_valid?
    id.match(/\w+\/\w+/) and entries.is_a?(Array)
  end

end