require './src/services/aws/ses'

describe Ses do
  it 'sends an email' do
    subject = 'subject'
    message_body = 'message_body'
    source = 'email@domain.com'
    recipients = ['recipients@domain.com']

    ses_params = {
        destination: {
            to_addresses: recipients
        },
        message: {
            body: {
                html: {
                    charset: 'UTF-8',
                    data: message_body
                },
            },
            subject: {
                charset: 'UTF-8',
                data: subject
            }
        },
        source: source
    }

    client = spy('ses_client')

    ses = Ses.new client
    ses.send_email(subject, message_body, source, recipients)

    expect(client).to have_received(:send_email).with(ses_params)
  end
end