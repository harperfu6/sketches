import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

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

    // こっちだとリソースの読み込みに失敗する、、
    // const api = new apigateway.LambdaRestApi(this, "Api", {
    //   handler,
    // });

    // https://aws.amazon.com/jp/blogs/news/developing-microservices-using-container-image-support-for-aws-lambda-and-aws-cdk/
    // 上記の記事で使われていたのがHttpApiだったので一旦こちらを使う
    const api = new HttpApi(this, "HttpApi", {
      apiName: "HttpApi",
      defaultIntegration: new HttpLambdaIntegration("Integration", handler),
    });
  }
}
