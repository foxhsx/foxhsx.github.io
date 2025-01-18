---
title: Dify4. 自定义 AI 工具（ChatGPT Actions）
date: 2024-07-22
tags:
  - AI
  - Dify
description: 在 Dify 中可以自定义工具，也可以使用内置工具，有没有一种使用 ChatGPT Actions 的感觉～
---

上篇文章《[38.2k 的 AI 开发平台 Dify 教程三：将 Notion 和网站作为知识库](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485086\&idx=1\&sn=16ffa7b2459ec604c9c0ce2c1ee31173\&chksm=fa68657fcd1fec69d4246d6271bafe0e0119a7c2731ad3049d258f7c3de722b864a05c0f6f3f#rd)》中我们介绍了在 Dify 中创建知识库的其他两种方式「同步 Notion」和「同步 Web 站点」。今天我们一起来看下**Dify 中内置的应用模板和工具**。

### 探索应用

点击页面顶部的「探索」Tab 即可跳转到「探索 Dify 应用」的页面，在这个页面中会列出内置的一些应用模板，如下图：

![](assets/1721229227735.webp)

目前**Dify 社区版中内置有 31 个应用模板**，按照类型分为三类：

* 聊天助手应用
* Agent 应用
* Workflow 应用

这些模板都是 Dify 团队的提示工程师**针对多种场景创建的高质量模板**，**对于新手小白来说非常友好**。

尤其是在对应用创建这个概念比较陌生的情况下，可以直接在里面选择一个合适的、感兴趣的模板进行应用的创建。在创建好之后我们既可以直接使用也可以学习一下这个应用模板是怎么配置的。

以「**Workflow Planning Assistant**」为例，我们可以看到它里面主要五步构成：

* 开始节点
* LLM 节点：Workflow Planning
* LLM 节点：Generate App Name
* 模板转换：Template
* 结束节点：直接回复

![](assets/1721459878920.webp)

我们可以点击右上角的「调试和预览」测试一下这个应用：

![](assets/1721460159906.webp)

可以看到在输入指令之后，工作流会一步一步地按照节点顺序开始执行任务，最终输出一个用来生成文章的 Workflow 规划，这对于不熟悉如何编排工作流的小伙伴来说，还是很好用的。

我们如果想要实现一个 Workflow，完全可以先使用这个模板帮我们生成一个，然后按照生成的结果 step by step 操作即可。

### 工具

用过 ChatGPT 的小伙伴们都知道 Actions，**在 Dify 中「工具」对标的就是 ChatGPT 的 Actions**，目前在 Dify 中已经**内置了 45 个工具**：

![](assets/1721460727615.webp)

我们**可以添加工具到工作流中，用来增强和完善工作流的能力**，这里以 Google 为例：

* 在使用 Google 工具之前，如果没有授权那么需要先进行授权才可以使用。授权时需要用到 serpapi 的 API Key，可以到 serpapi 的官网进行申请，每个月有 100 条的免费搜索额度
* 申请好 Key 之后进行授权，然后就可以正常使用 Google 工具了

接下来就是将 Google 工具集成到工作流中：

![](assets/1721461535986.webp)

除了这些内置好的工具之外，我们也可以**自定义工具**：

![](assets/1721462815208.webp)

在 Schema 中**输入符合 OpenAPI 的 schema格式**，这里 Dify 也提供了符合规范的 Schema 例子：

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Get weather data",
    "description": "Retrieves current weather data for a location.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://weather.example.com"
    }
  ],
  "paths": {
    "/location": {
      "get": {
        "description": "Get temperature for a specific location",
        "operationId": "GetCurrentWeather",
        "parameters": [
          {
            "name": "location",
            "in": "query",
            "description": "The city and state to retrieve the weather for",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
```

三金这里自定义了一个获取掘金热榜的工具，测试了一下完全 OK：

![](assets/1721463079300.webp)

![](assets/1721463097752.webp)

回到工作流应用中，我们也可以在自定义工具中找到它：

![](assets/1721463173117.webp)

好啦～到这里我们已经介绍了 Dify 的大部分功能，包括：

* 部署及基础使用：[37.4k 的 Dify，一款小白也可以轻松上手的大模型开发平台（一）：部署及基础使用](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485019\&idx=1\&sn=572e8f94c6d082183d80788a53cc6f55\&chksm=fa6865bacd1fecac6f3ed04454f5751444c7cf7849490d8991faf9e9c2296f565ac05140aa58\&token=1941914531\&lang=zh_CN#rd)**[原创](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485019\&idx=1\&sn=572e8f94c6d082183d80788a53cc6f55\&chksm=fa6865bacd1fecac6f3ed04454f5751444c7cf7849490d8991faf9e9c2296f565ac05140aa58\&token=1941914531\&lang=zh_CN#rd)**
* 连接本地大模型 Ollama：[Dify 教程二：使用本地大模型 Ollama](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485047\&idx=1\&sn=05e09f8ed8c452b42c151a7f67cdb6f7\&chksm=fa686596cd1fec80e020bd0de536f031a966ad06138bba27479d6f6885a915f38490f67ee1fa\&token=1941914531\&lang=zh_CN#rd)**[原创](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485047\&idx=1\&sn=05e09f8ed8c452b42c151a7f67cdb6f7\&chksm=fa686596cd1fec80e020bd0de536f031a966ad06138bba27479d6f6885a915f38490f67ee1fa\&token=1941914531\&lang=zh_CN#rd)**
* 创建知识库的三种方法：[38.2k 的 AI 开发平台 Dify 教程三：将 Notion 和网站作为知识库](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485086\&idx=1\&sn=16ffa7b2459ec604c9c0ce2c1ee31173\&chksm=fa68657fcd1fec69d4246d6271bafe0e0119a7c2731ad3049d258f7c3de722b864a05c0f6f3f\&token=1941914531\&lang=zh_CN#rd)**[原创](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485086\&idx=1\&sn=16ffa7b2459ec604c9c0ce2c1ee31173\&chksm=fa68657fcd1fec69d4246d6271bafe0e0119a7c2731ad3049d258f7c3de722b864a05c0f6f3f\&token=1941914531\&lang=zh_CN#rd)**
* 内置应用模板及工具

接下来我们将结合上述功能完成一个完整的 Workflow～
