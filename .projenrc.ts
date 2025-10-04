import { awscdk } from 'projen';
import { GithubCDKPipeline, VersioningOutputs, VersioningStrategy } from 'projen-pipelines';
import { ReleaseTrigger } from 'projen/lib/release';

const app = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'pipeline-projen-pipelines',
  projenrcTs: true,
  deps: ['projen-pipelines'],
  releaseTrigger: ReleaseTrigger.manual(),  
});

new GithubCDKPipeline(app, {
  stackPrefix: 'MyApp',
  iamRoleArns: {
    default: 'arn:aws:iam::857739166276:role/GithubDeploymentRole',
  },
  pkgNamespace: '@jumic',
  useGithubPackagesForAssembly: true,
  stages: [
    {
      name: 'dev',
      env: { account: '352770552266', region: 'eu-central-1' },
    }, {
      name: 'prod',
      // manualApproval: true,
      env: { account: '505825668341', region: 'eu-central-1' },
    },
  ],
  versioning: {
    enabled: true,
    strategy: VersioningStrategy.gitTag(),
    outputs: VersioningOutputs.standard(),
  },
});

app.synth();