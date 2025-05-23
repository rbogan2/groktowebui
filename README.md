# groktowebui 要如何接入


## 项目简介


本项目提供了一种简单、高效的方式使用openAI的格式转换调用grok官网进行api处理。

> 需要自己ip没有被风控。如果被风控，将会升级为5秒盾，无法绕过。

## 检测ip是否被风控？
1. 打开无痕浏览器，输入官网地址。
2. 直接进入则没有被风控，如果出现CF验证码，则表示已经被风控，该ip无法使用本项目。
3. 如果风控后，过了5秒盾，会给与一个一年有效期的cf_clearance，可以将这个填入环境变量CF_CLEARANCE，这个cf_clearance和你的ip是绑定的，如果更换ip需要重新获取。
4. 如果ip没有风控，不要加cf_clearance，加了可能反而因为校验问题出盾。
5. 如果还是没有解决，建议更换ip重新尝试。

## 主要功能
1. 支持全部模型识图和传图
2. 支持深度搜索功能
3. 支持推理模型功能
4. 支持真流式
5. 支持搜索功能
6. 可自定义http和Socks5代理
7. 可以选择是否移除思考模型的思考过程
8. 转换为openai格式

## 接口文档

| 接口 | 方法 | 路径 | 描述  |
| ------ | ------ | ------ | ------ |
| 模型列表 | get | /v1/models | 获取可用模型列表 | 
| 对话 | post | /v1/chat/completions | 发起对话请求 | 

## 令牌管理与设置

| 接口 | 方法 | 路径 | 请求体  | 描述  |
| ------ | ------ | ------ | ------ |------ |
| 添加令牌 | POST | /add/token | {so: "XXXXXXXXXX"} |  添加认证令牌 | 
| 删除令牌 | POST | /delete/token | {so: "XXXXXXXXXX"} | 删除认证令牌 | 
| 获取令牌状态 | GET | /get/tokens | - | 查询令牌状态 | 



## 备注
- 消息基于用户的伪造连续对话
- 可能存在一定程度的降智
- 生图模型不支持历史对话，仅支持生图

## 补充说明
- 自动移除历史消息里的think过程，同时如果历史消息里包含里base64图片文本，而不是通过文件上传的方式上传，则自动转换为[图片]占用符。

## 注意事项：

- 所有POST请求需要在请求体中携带相应的认证信息
- 令牌敏感信息，请妥善保管
- 本项目仅供学习和研究目的，请遵守相关使用条款。
