# bandit
アルゴリズムごとの期待値の比較

https://5s39uujxa0.execute-api.ap-northeast-1.amazonaws.com/

# 開発
## banditアルゴリズムのアップデート/追加
bandit/src内にアルゴリズムを追加
## wasmのアップデート
bandit内のRustコードを修正後以下を実行
- wasmのビルドとweb配下へのpkgのコピー(Makefile.tomlを参照)
```
$ makers wasm
```
## AWSへのデプロイ
```
$ cd ../
$ cdk deploy --profile udaiz-cdk-user
```
# メモ
- next(standalone)でデプロイ([参考](https://zenn.dev/team_zenn/articles/nextjs-standalone-mode-cloudrun
))
- LambdaRestApiだとなぜかリソースの読み込みに失敗するので、[ブログ](https://tmokmss.hatenablog.com/entry/20221213/1670891305)や[DockerImageFunctionを使っているAWS記事](https://aws.amazon.com/jp/blogs/news/developing-microservices-using-container-image-support-for-aws-lambda-and-aws-cdk/)を参考にHttpApiを使ったらうまくいった
- vite + expressだと同じくリソースの読み込みでうまくいかず(ただし上記を試す前だったので現状のCDKであればうまくいくかも)

# TODO
- algorithm
	- [x] epsilon greedy
		- [x] annealing epsilon greedy
	- [x] softmax
		- [x] annealing softmax
	- [ ] Thompson
	- [ ] UCB1
	- [ ] exp3
- feature
	- [ ] button for select algorithm
	- [ ] input for sim/coin num


# ref
- https://github.com/DanielMorton/ratel
