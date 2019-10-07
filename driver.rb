#!/usr/bin/ruby

require './src/models/email_module'
require './src/config/modules'

Modules.config

puts((EmailModule.get "jonbooz/test").to_hash)
puts((EmailModule.get "jonbooz/second").to_hash)

modules = EmailModule.begins_with('id', 'jonbooz')
modules.each { |m| puts m.to_hash }

