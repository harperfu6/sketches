# TODO
- node server.jsエラーが発生する(server.jsがない)エラーの解消
- cdk で web アプリをデプロイ
  - lambda
    - web アプリを Docker(aws-lambda-adapter)に乗せる
  - apiGateway
  - route53
- CI/CD の実装

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
