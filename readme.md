>启动项目

yarn start

>打包项目

yarn build


> 执行批量操作

yarn batch start

yarn batch add **

> 本机预览线上环境(前提已经安装nginx)

修改 server.root 到根目录地址
修改 location.proxy_pass 服务器地址

yarn nginx:start
yarn nginx:stop