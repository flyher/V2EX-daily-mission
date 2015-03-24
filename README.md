[V2EX](http://www.v2ex.com)的自动[签到](http://www.v2ex.com/mission/daily)  
部署在 GAE 上

- 支持多用户，GAE 的账号管理
- 每个用户可以添加多个账号
- 登录之后只保留 Cookies，目前 Cookies 有效期是一个月，签到失败会发邮件通知
- 默认 +08:00 每天早 08:10 开始签到


Demo: [http://v2ex-daily.appspot.com](http://v2ex-daily.appspot.com)  
此 Demo 是可以正常使用的，需要登录；登录不添加 V2EX 账号即不会在数据库留有记录；App 是我部署的，所以“慎用” :)


安装方法：

1. 重命名 `app.yaml.sample` 为 `app.yaml`，修改 `application` 值为你的 GAE `应用名称`
2. 上传
3. 访问应用地址，用 Google 账号登录，添加 V2EX 账号