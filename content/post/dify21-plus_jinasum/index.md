---
title: Dify21. DOW 增强-可控 JinaSum + 追问
date: 2024-12-28
description: 社群内大神改装后的 JinaSum 插件，不但支持纯链接总结、手动触发总结、自动触发总结、自动触发追问，并且支持群聊黑名单设置。
tags:
  - AI
  - Dify
---

> 此文章的兄弟文章：[如何将 39.3k 的开源知识库 Dify 接入微信](https://juejin.cn/post/7396118693758107674)[使用 dify-on-wechat 中的插件搭建私人助理](https://juejin.cn/post/7409147273736339508)

最近群里有位大佬增强了一下 dow 的 JinaSum 插件，比原版插件用起来顺手多了。为什么推荐这个增强版的插件呢？

因为之前的 JinaSum 在安装之后：

* 无法手动触发网址解析；
* 无法指定某个群聊不触发解析；
* 更没办法在解析之后进行追问。

而增强后的插件：

* 可以关闭自动总结，在卡片后面输入「总结」后手动触发；
* 对于纯链接，可以通过「总计 `<链接>`」的方式触发总结；
* 可以在总结后五分钟内进行追问；
* 对于自动总结开启的场景，可以单独设置群聊黑名单，确保在指定群聊中不会自动触发链接总结。

对于单聊来说，始终会自动触发。

> [项目地址](https://github.com/sofs2005/jina_sum)，也请各位小伙伴多多 Star\~

#### 安装

如果之前已经有安装过 JinaSum 插件，可以先通过 `#uninstallp jinaSum` 卸载掉之前的版本。 之后再通过 `#installp https://github.com/sofs2005/jina_sum.git` 来安装增强版本。

![](assets/mMv80h249St0BsKlZs6rTp8bXU47VrSjDHgz2WKv3Ls=.webp)

![](assets/wX1Gu1VzQ15perJZmJ4otmk9SQbSYOB9CPW7JbjEMVU=.webp)

安装成功之后我们先执行 `#scanp` 再执行 `#plist` 来查看插件状态：

![](assets/9rlNsLs1t9W5BN6Ti5UlRNWbZC3qt1ZyZCLpAP0v1Ts=.webp)

到这里我们已经安装成功了！

#### 配置

进到 `dify-on-wechat` 项目目录下的 `plugins/jina_sum` 文件夹中，执行以下命令来创建配置文件：

```shellscript
cp config.json.template config.json
```

增强版的配置比原版的多了三个选项：

* `auto_sum`：是否自动总结-只在群聊生效；
* `qa_trigger`：追问触发词；
* `black_group_list`：自动总结开启时，可以设置群聊黑名单，使用群名即可。

默认配置如下：

```json
{
  "jina_reader_base": "https://r.jina.ai",           # jina reader链接，默认为https://r.jina.ai
  "open_ai_api_base": "https://api.openai.com/v1",   # chatgpt chat url
  "open_ai_api_key":  "sk-xxx",                      # chatgpt api key
  "open_ai_model": "gpt-3.5-turbo",                  # chatgpt model
  "max_words": 8000,                                 # 网页链接内容的最大字数，防止超过最大输入token，使用字符串长度简单计数
  "white_url_list": [],                              # url白名单, 列表为空时不做限制，黑名单优先级大于白名单，即当一个url既在白名单又在黑名单时，黑名单生效
  "black_url_list": ["https://support.weixin.qq.com", "https://channels-aladin.wxqcloud.qq.com"],  # url黑名单，排除不支持总结的视频号等链接
  "prompt": "我需要对下面的文本进行总结，总结输出包括以下三个部分：\n📖 一句话总结\n🔑 关键要点,用数字序号列出3-5个文章的核心内容\n🏷 标签: #xx #xx\n请使用emoji让你的表达更生动。",                           # 链接内容总结提示词
  "auto_sum": true,                                # 是否自动总结
  "qa_trigger": "问",                               # 追问触发词
  "black_group_list": [],                          # 群聊黑名单
}
```

这里特别提醒一下小白朋友们，AI 的 url 链接和 API Key 一定要填写自己的 key 和代理 url，国内无法直连 OpenAI 官方的！！

#### 测试

##### auto\_sum-是否自动总结

默认开启的，也就是说只要检测到有链接分享就会进行总结，这个配置项的**作用范围是所有群聊**。

![](assets/2lqQGj26WLg0parvqa9LtTy6nXNqglzaM1B2Ghg1Jqk=.webp)

现在我们将其改为 false，然后 `#reloadp jinaSum` 重载插件再测试一下～

![](assets/D45Mlgll13sAhISOWti-_4_Y4SLchbOZjluXpzhDJyw=.webp)

这种情况下要触发总结的话分为两个场景：

* **纯链接**：需要在纯链接前面增加「总结」才能手动触发
* **分享卡片**：在分享之后，补充「总结」手动触发

一起来看看～

![](assets/FPLLGbQzJq9IV67A2Xh1IE-Hr2OtiuB0Vmj4t2nsrUI=.webp)

![](assets/pws2jmv_ZwJ5qUtHfnvedEhKC8B_BQby_9Ecgf8RqkE=.webp)

##### 追问

紧接上面的总结，我们追问一下：

![](assets/nVm59aON0tPWMhwUyHdMarFpKiwcbyZJNXnDf1_PJ3o=.webp)

##### black\_group\_list

* **针对开启了自动总结，但是不想在群聊中生效**；
* **但又可以通过手动的方式来触发总结的场景**。

在这个配置项中输入要加黑的群聊名称即可。 如此一来，加黑后的群聊就只能通过手动触发的方式进行总结了👇：

![](assets/8lTzKXq2-pHIVT51DuPiwBhZx8igjVVL0M5twNeJlHg=.webp)

#### 总结

这里直接上大佬的 README。

1. 私聊：
   * 直接发送文章链接或分享卡片，会自动总结
   * 总结完成后 5 分钟内可发送"问xxx"追问文章内容
2. 群聊：
   * 当 `auto_sum=true` 时：
     * 非黑名单群组：自动总结分享卡片和链接
     * 黑名单群组：需要发送"总结"触发总结
   * 当 `auto_sum=false` 时：
     * 所有群组都需要发送"总结"触发总结
   * 分享卡片总结：
     * 发送卡片后，发送"总结"触发
   * URL 总结方式灵活，支持：
     * "总结 链接"
     * "总结链接"
     * "链接总结"
   * 总结完成后5分钟内可发送"问xxx"追问文章内容

