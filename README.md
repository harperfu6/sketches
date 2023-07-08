# bandit
アルゴリズムごとの期待値の比較

https://5s39uujxa0.execute-api.ap-northeast-1.amazonaws.com/

# 開発
## banditアルゴリズムのアップデート/追加
bandit/bandit/src内にアルゴリズムを追加
## wasmのアップデート
bandit/bandit内のRustコードを修正後以下を実行
- wasmのビルドとweb配下へのpkgのコピー(Makefile.tomlを参照)
```
$ makers wasm
```
## AWSへのデプロイ
```
$ cdk deploy
```
# メモ
- next(standalone)でデプロイ([参考](https://zenn.dev/team_zenn/articles/nextjs-standalone-mode-cloudrun
))
- LambdaRestApiだとなぜかリソースの読み込みに失敗するので、[ブログ](https://tmokmss.hatenablog.com/entry/20221213/1670891305)や[DockerImageFunctionを使っているAWS記事](https://aws.amazon.com/jp/blogs/news/developing-microservices-using-container-image-support-for-aws-lambda-and-aws-cdk/)を参考にHttpApiを使ったらうまくいった
- vite + expressだと同じくリソースの読み込みでうまくいかず(ただし上記を試す前だったので現状のCDKであればうまくいくかも)
