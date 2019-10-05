#!/usr/bin/ruby

require './src/utils/JsonFileLogger'
require './src/utils/Hashable'

class Test < Hashable
  attr_accessor :value
end

t = Test.new
t.value = 'value'

logger = JsonFileLogger.new('test.log')
logger.log({key: 'test'})
logger.log('string')
logger.log(t)
