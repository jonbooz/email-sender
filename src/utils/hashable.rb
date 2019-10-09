class Hashable
  def to_hash
    hash = { }
    self.instance_variables.each do |var|
      hash[var.to_s.delete("@")] = if self.instance_variable_get(var).respond_to? 'to_hash'
                                       self.instance_variable_get(var).to_hash
                                     else
                                       self.instance_variable_get(var)
                                     end
    end
    hash
  end
end