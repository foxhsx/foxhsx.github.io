---
title: Dify19. 通过 NewAPI 接入 Dify 后能做什么？
date: 2024-12-21
description: NewAPI 都支持哪些 Dify 应用的中转？
tags:
  - AI
  - Dify
---

上一篇文章《[有了 NewAPI 之后，Dify 的可玩儿性又高了](https://mp.weixin.qq.com/s/Q9dVgGE5PzyXc82DiOkNGQ?token=2004532047\&lang=zh_CN)》给大家介绍了可以支持中转 Dify 的 new-api 项目，今天我们来看看它都支持哪些应用中转～

### 接入 Chatflow

之前有介绍过一个 《[使用 Dify 搭一个 gpt-o1（山寨版）](https://mp.weixin.qq.com/s/V06VyuYcI1h3yLhVelAULA)》，这是一个 Chatflow，我们获取一下它的 API Key 之后接入到 new-api 中来测试一下。

1. 进入到 dify-o1 的详情页面；
2. 点击左侧「工作流编排对话型应用 API」页面，是一个 shell 的图标；
3. 在右上角「API 密钥」这里新建或者复制已有 API。

![](assets/8gmt1uJ1jOkAmHAR601_xMbH2MsfPtmaAaJmj9LHbCE=.webp)

然后换到 new-api 的控制台页面，按照上一篇文章中讲到的步骤将这个渠道添加一下，我们可以起名为 dify-chatflow：

![](assets/q1ox9_lGx1tELOgcF-hO32DZFqzK3IyDjCDNmbhd6mU=.webp)

同样，我们再新建一个同名的令牌：

![](assets/eP95yMaexGp6SMBczC_7mfO8SrJcXXtgumUFRlCMZ7s=.webp)

复制下令牌的 key 之后，我们再到 openWebUI 这边进行接入（如何接入也在上一篇文章中有介绍，这里不再赘述）：

![](assets/m1B75bScBzLYSMLagu5KnWtWmZ4EygwDAbgQ8-5r-mg=.webp)

可以看到 chatflow 可以调通，但是会多出来一些不必要的信息。

这是因为我们在运行 new-api 的时候没有设置`DIFY_DEBUG`导致的，这个配置项的作用是**允许 Dify 渠道是否输出工作流和节点信息到客户端**，默认为`true`。我们只需要在运行项目时将其改为 false 即可。

献上 docker 命令：

```shell
docker run --name new-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -e DIFY_DEBUG=false -v ./:/data calciumion/new-api:latest
```

### 接入普通对话

后续流程和 chatflow 保持一致，不同的是：

* 因为要进行不同场景下的连通测试，所以在接入渠道时，在自定义模型上我们可以把模型名称保持和渠道名称一致；
* 在创建令牌时，启用模型限制；

![](assets/arMNSjVTdUmg8citPbTEXK5y9XDUVrurALhLYWt6IJk=.webp)

在 openWebUI 这里我们修改之前的外部链接：

1. 右上角头像那里点击设置-管理员设置-外部链接；
2. 点击「管理 OpenAI API 连接」右侧的设置按钮进行修改；
3. URL 地址保持不变；
4. 填入上一步复制的 API Key 即可。

OK 之后直接开始测试：

![](assets/-wgvV5F1m1JqS5m0MhcwMTh-DVnf9XUvrxyNpsRuVGY=.webp)

普通会话的方式会好很多，毕竟也没有节点。

> 后面的测试也是这一套流程，大家根据不同的应用类型接入 new-api，并在之后接入 openWebUI 就行。

### 接入 Workflow

测试无法正常使用 Workflow，问了作者确实不支持。

![](assets/6mGB6gBcgqCQ-jjOOk4RPk34JSXcz3pC9oSIAwboyow=.webp)

### 接入 AI Agent

* 在 Dify 中工具没有提供 API，已知自定义工具的方式有两个：通过 OpenAPI Swagger 的方式和 Workflow。
* 我们已经测试过 Workflow 无法通过 new-api 转发来接入其他应用
* 知识库更不用说，因为它和 AI API 都不是一个体系的

不过我们可以通过 AI Agent 的形式可以将一部分简单的 Workflow 和知识库转发出去。只需要在 AI Agent 中加入知识库和工具即可。

但是！！测试了一下 Dify 的 Agent 目前也没有支持。

### 另辟蹊径加入工具和知识库

不过也没关系，Chatflow 中也支持加入知识库和工具，所以我们也可以通过这种聚合的方式来实现另类的接入。

![](assets/trB6cb9f8KPjPjUgrynuCCKPTNPsp3HKHRzw3sjEGUI=.webp)

截图中上面那个是启动 new-api 时没有设置`DIFY_DEBUG`的回答，下面那个是设置`DIFY_DEBUG`为 false 之后的回答，可以看到直接给出了回答，这个截图的 chatflow 是加入了老演员 k8s 知识库的，也确实从知识库中检索出了相关内容并返回，看来这个路子是通的。

大家感兴趣的话也可以自己尝试一下～
