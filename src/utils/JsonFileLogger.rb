require 'json'

require_relative './FileLogger'

class JsonFileLogger < FileLogger

  def initialize(filepath)
    super(filepath)
  end

  def log(message)
    as_json = if message.respond_to? :to_hash
                JSON.generate(message.to_hash)
              else
                JSON.generate message
              end

    File.open(@path, 'a') { |f| f.write as_json }
  end
end