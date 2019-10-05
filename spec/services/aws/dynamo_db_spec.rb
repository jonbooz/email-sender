require './src/services/aws/dynamo_db'

describe DynamoDb do
  it 'reads a item from a table' do
    key = {
        key: 'key'
    }
    item = {
        key: 'key',
        value: 'value'
    }
    read_params = {
        table_name: 'table',
        key: key
    }

    client = spy('ddb_client')
    result = double('result', :item => item)
    allow(client).to receive(:get_item) { result }

    ddb = DynamoDb.new client
    expect(ddb.read('table', key)).to eq item
    expect(client).to have_received(:get_item).with(read_params)
  end

  it 'scans multiple items from a table' do
    items = [
        {
            key: 'scan/first',
            value: 1
        },
        {
            key: 'scan/second',
            value: 2
        }
    ]
    table = 'table'
    expression = 'begins_with(#n, :v1)'
    values = {':v1': 'scan'}
    names = {'#n': 'key'}
    scan_params = {
        table_name: table,
        filter_expression: expression,
        expression_attribute_values: values,
        expression_attribute_names: names
    }
    client = spy('ddb_client')
    result = double('result', :items => items)
    allow(client).to receive(:scan) { result }

    ddb = DynamoDb.new client
    output = ddb.scan(table,
                      expression,
                      values,
                      names)

    expect(output).to eq items
    expect(client).to have_received(:scan).with(scan_params)
  end

  it 'saves an item to a table' do
    table = 'table'
    item = {
        key: 'key',
        value: 'value'
    }

    ddb_params = {
        table_name: table,
        item: item
    }

    client = spy('ddb_client')
    ddb = DynamoDb.new client
    ddb.save(table, item)

    expect(client).to have_received(:put_item).with(ddb_params)
  end
end
