import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class LambdaWebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

		const lambdaWebApp = new LambdaDockerWebApp(this, "LambdaDockerWebApp");
  }
}

class LambdaDockerWebApp extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new lambda.DockerImageFunction(this, "Handler", {
      code: lambda.DockerImageCode.fromImageAsset("../bandit/web/"),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
    });

    const api = new apigateway.LambdaRestApi(this, "Api", {
      handler,
    });
  }
}
