require './src/services/aws/dynamo_db'

describe DynamoDb do
  it 'reads a item from a table' do
    item = {
        'key': 'key',
        'value': 'value'
    }

    client = double('ddb_client')
    result = double('result', :item => item)
    allow(client).to receive(:get_item) { result }

    ddb = DynamoDb.new client
    expect(ddb.read('table', 'ke')).to eq item
  end
end
