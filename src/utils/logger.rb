class Logger

  def initialize(log_level=:error)
    @log_level = log_level
  end

  def error(message)
    if can_print(:error)
      puts message
    end
  end

  def info(message)
    if can_print(:info)
      puts message
    end
  end

  def debug(message)
    if can_print(:debug)
      puts message
    end
  end

  def trace(message)
    if can_print(:trace)
      puts message
    end
  end

  private
  def can_print(method)
    if method == :error
      true
    elsif method == :info
      return @log_level != :error
    elsif method == :debug
      return (@log_level == :debug or @log_level == :trace)
    else
      @log_level == :trace
    end
  end
end