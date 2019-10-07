class Hashable
  def to_hash
    hash = { }
    self.instance_variables.each {|var| hash[var.to_s.delete("@")] = self.instance_variable_get(var) }
    hash
  end
end