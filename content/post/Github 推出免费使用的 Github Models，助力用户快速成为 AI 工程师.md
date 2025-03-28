---
title: Github 推出免费使用的 Github Models，助力用户快速成为 AI 工程师
date: 2025-03-06
tags: [AI]
draft: false
description: Github 推出了免费使用的 Github Models，里面包含好多大厂 AI 模型
---

首先三金先介绍一下**什么是 Github Models**：

> Github Models 是 Github 推出的一款新产品，**旨在快速推动开发人员使用、体验各种 AI 大模型，并在自己的应用上集成模型。**

[Github 地址](https://github.com/marketplace/models)

![](https://note.ihsxu.com/api/imgs/1722697711075.webp)

### 支持 24 种模型

目前支持 24 种模型，按照类型有 **Cohere、Llama 3 及 3.1、Mistral、OpenAI 的 ChatGPT 及 Phi-3**：

![](https://note.ihsxu.com/api/imgs/1722697735838.webp)

### 如何使用？

Github Models 还不是全量开放给用户的，还**需要进行申请**，只有申请通过的用户才可以使用，[申请链接](https://github.com/marketplace/models/waitlist/join)

> 三金已经提交申请了，但暂时还没有啥音讯:😓:

![](https://note.ihsxu.com/api/imgs/1722697786074.webp)

![](https://note.ihsxu.com/api/imgs/1722697830282.webp)

不过也不妨碍咱继续介绍它。

#### 免费使用的 Playground

要进入到 Github Models 的 Playground 也很简单，直接从模型列表页面点击想要测试的 AI 进入到详情页面，在右上角有一个 Playground 的按钮，这个就是免费演练场的入口：

![](https://note.ihsxu.com/api/imgs/1722772810197.webp)

![](https://note.ihsxu.com/api/imgs/1722772826817.webp)

申请还没有通过会看到这样的页面：

![](https://note.ihsxu.com/api/imgs/1722772877119.webp)

正常通过的话是这样的：

![](https://note.ihsxu.com/api/imgs/1722775234415.webp)

#### 免费 API

除了免费的 Playground 之外，Github 还**提供了免费的 API 使用**，这使得开发者可以更方便地在自己的应用中调试 AI。和 Playground 的入口一样，API 也是在模型的详情页面获取：

* •
  点击**右上角的「Get started」**
* •
  在弹出的对话框中，我们可以在**左侧菜单里选择 Language（比如 JavaScript）和 SDK**；
* •
  然后**右边的内容区域会给出将该 SDK 接入应用的步骤，最关键的第一步是创建一个 Access Token**

![](https://note.ihsxu.com/api/imgs/1722773402817.webp)

简单来说，上图中红框框住的部分，我们操作到了第三步就基本 OK 了：

1. 创建个人访问令牌
2. 安装依赖
3. 运行基本代码示例

后面两个一个是更多的示例探索，另外一个则是介绍了一下这些免费资源的速率限制。

### 速率限制

![](https://note.ihsxu.com/api/imgs/1722773657571.webp)

### 在生成环境中使用

如果要将做好的 AI 应用放到生产环境，那么 Github 的 Access Token 就不可用了，因为 **GIthub Models 里提供的免费资源只是在帮助开发者试验模型并使用模型开发 AI 应用程序**。所以在生产环境需要付费使用 Azure 中的 API Key。

> 详细信息，请参考 [Azure AI](https://ai.azure.com/github/model/docs) 的文档

### 官方视频

