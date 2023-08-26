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
- 機能
	- パラメータで選択できるようにする（modalで変更する）
		- 各アームの個数/確率（アイコンで追加できるようにする）
			- 現在の状態はグラフで表示
			- 適当に生成する機能
		- アルゴリズム
			- パラメータ
	- アルゴリズムごとの結果を重畳表示できるようにする
		- 表示するグラフを選択できるようにする
	- 同じ値のarmがあるとgetOptArmの判定がうまくいかない
- algorithm
	- [x] epsilon greedy
		- [x] annealing epsilon greedy
	- [x] softmax
		- [x] annealing softmax
	- [ ] Thompson
	- [ ] UCB1
	- [ ] exp3

# ref
- https://github.com/DanielMorton/ratel
