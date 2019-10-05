class FileLogger
  def initialize(filepath)
    @path = filepath
  end

  def log(message)
    File.open(@path, 'a') { |f| f.write message }
  end


end