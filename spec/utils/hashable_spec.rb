require './src/utils/hashable'

class Lower < Hashable
  attr_accessor :one, :two, :three
end

class Upper < Hashable
  attr_accessor :direct, :nested
end

def build_lower
  lower = Lower.new
  lower.one = 1
  lower.two = 2
  lower.three = 3

  expected = { }
  expected["one"] = 1
  expected["two"] = 2
  expected["three"] = 3

  [lower, expected]
end

def build_upper
  lower, expected_nested = build_lower

  upper = Upper.new
  upper.direct = 'direct'
  upper.nested = lower

  expected = { }
  expected["direct"] = "direct"
  expected["nested"] = expected_nested

  [upper, expected]
end

describe Hashable do
  it 'hashes an object' do
    lower, expected = build_lower

    expect(lower.to_hash).to eq expected
  end

  it 'hashes an object with a hashable object' do
    upper, expected = build_upper
    lower, expected_nested = build_lower

    upper = Upper.new
    upper.direct = 'direct'
    upper.nested = lower

    expected = { }
    expected["direct"] = "direct"
    expected["nested"] = expected_nested

    expect(upper.to_hash).to eq expected
  end

  it 'hashes three levels deep' do
    middle, expected_middle = build_upper

    upper = Upper.new
    upper.direct = 'direct'
    upper.nested = middle

    expected = { }
    expected["direct"] = "direct"
    expected["nested"] = expected_middle

    expect(upper.to_hash).to eq expected
  end
end