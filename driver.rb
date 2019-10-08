#!/usr/bin/ruby

require './src/models/email_module'
require './src/config/modules'

Modules.config

#puts((EmailModule.get "jonbooz/test").to_hash)
#puts((EmailModule.get "jonbooz/second").to_hash)
#modules = EmailModule.begins_with('id', 'jonbooz')
#modules.each { |m| puts m.to_hash }

new_mod = EmailModule.new
new_mod.id = 'jonbooz/third'
new_mod.entries = ["jonbooz-image-sender:third.png"]
new_mod.heading = 'Third'
new_mod.format = 'imageBlob'

puts new_mod.to_hash

new_mod.save
puts((EmailModule.get "jonbooz/third").to_hash)