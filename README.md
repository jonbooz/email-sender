# email-sender
An email sender for my as of yet unnamed service.

## Development

### Setup

To pull dependences, run `npm install`.

> You might find it useful to install `grunt` globally: `npm install -g grunt-cli`
> You probably also want `tsc` installed globallay: `npm install -g typescript`

**email-sender** requires the [AWS CLI](https://aws.amazon.com/cli/).

Prior to any deployment, make sure your [AWS credentials are set](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html). **email-sender** uses the shared config file.

Grunt commands:

- To setup a new stack: `grunt create-stack`
- To update an existing stack: `grunt update-stack`
- To deploy changes to sender: `grunt sender`
