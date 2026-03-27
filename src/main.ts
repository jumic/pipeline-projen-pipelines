import { Stack, StackProps } from 'aws-cdk-lib';
import { Queue, QueueEncryption } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { PipelineApp } from './app';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Queue(this, 'MyQueue');
    new Queue(this, 'AnotherQueue');
    new Queue(this, 'ThirdQueue', {
      encryption: QueueEncryption.KMS_MANAGED,
    });

  }
}

const app = new PipelineApp({
  provideDevStack: (scope, id, props) => {
    return new MyStack(scope, id, {
      ...props,
    });
  },
  provideProdStack: (scope, id, props) => {
    return new MyStack(scope, id, {
      ...props,
    });
  },
});

app.synth();