import { awscdk } from 'projen';
import { GithubCDKPipeline, VersioningOutputs, VersioningStrategy } from 'projen-pipelines';

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
  versioning: {
    strategy: VersioningStrategy.gitTag({
    stripPrefix: 'v',           // Strip 'v' from tags (v1.2.3 → 1.2.3)
    annotatedOnly: true,        // Only use annotated tags
    includeSinceTag: true       // Include commits since tag
  }),
  enabled: true,
    outputs: VersioningOutputs.standard(),
  }
});

app.synth();