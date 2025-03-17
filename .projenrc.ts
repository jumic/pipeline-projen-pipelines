import { awscdk } from 'projen';
import { GithubCDKPipeline } from 'projen-pipelines';

const app = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'pipeline-projen-pipelines',
  projenrcTs: true,
  deps: ['projen-pipelines'],
});

new GithubCDKPipeline(app, {
  stackPrefix: 'MyApp',
  iamRoleArns: {
    default: 'arn:aws:iam::857739166276:role/GithubDeploymentRole',
    assetPublishingPerStage: {
      dev: 'cdk-hnb659fds-file-publishing-role-352770552266-eu-central-1',
      prod: 'cdk-hnb659fds-file-publishing-role-505825668341-eu-central-1',
    },
    deployment: {
      dev: 'cdk-hnb659fds-deploy-role-352770552266-eu-central-1',
      prod: 'cdk-hnb659fds-deploy-role-505825668341-eu-central-1',
    },
  },
  pkgNamespace: '@jumic',
  useGithubPackagesForAssembly: true,
  stages: [
    {
      name: 'dev',
      env: { account: '352770552266', region: 'eu-central-1' },
    }, {
      name: 'prod',
      manualApproval: true,
      env: { account: '505825668341', region: 'eu-central-1' },
    },
  ],
});

app.synth();