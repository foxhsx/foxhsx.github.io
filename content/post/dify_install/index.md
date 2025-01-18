---
title: Dify1. 部署及基础使用
date: 2024-07-14
description: Dify 作为一款热门的 AI 工具，能够帮助你快速搭建各种智能应用。本文将带你从零开始，掌握 Dify 的基本用法，让你轻松踏入 AI 开发领域。
tags:
  - AI
  - Dify
---

之前三金有介绍过一款搭建私人 AI 知识库的开源产品——FastGPT，使用过一段时间之后发现在上传本地文件时偶尔会失败，而且只有付费版才可以使用 Web 站点同步功能，所以也就萌生了再找找平替产品的念头。

在花费了大量时间在 Github 畅游之后，Dify 出现了～

那么 Dify 是什么呢？

> **它是一个开源的 LLM 应用开发平台。包含 AI Workflow、RAG、模型管理以及可观测性功能等，即使是小白也能快速使用 Dify 搭建一款 AI 产品。&#xA;**[Github 地址](https://github.com/langgenius/dify)

它拥有以下**7 个核心功能**：

* **工作流**：我们可以在 Dify 提供的画布上快速构建出一个可以执行自动化任务的 AI 应用；
* **支持大多数市面上流行的 AI 模型**：包括 ChatGPT、Mistral、Llama3 以及通义千问等；
* **直观简洁的界面**，可以用于制作提示、比较模型性能以及向基于聊天的应用程序添加文本转语音等附加功能；
* **RAG 功能**：涵盖从文档中摄取到的需要检索的所有内容，支持上传 PDF、PPT 和其他常见文档格式；
* **Dify 内置了 50 多个工具**，例如 Google Search、DELL·E、Stable Diffusion 和 WolframAlpha。也可以自定义工具；
* **LLMOps**：监控和分析应用程序日志和性能；
* Dify 的所有产品**都附带相应的 API**，因此我们也可以很轻松地将 Dify 集成到自己的业务中去。

接下来我们一起来看看**如何在本地快速部署 Dify**吧～

### 部署

我们选择**使用 Docker Compose 来部署**。但是在部署之前，需要注意应用部署的**前提条件**：

![](assets/1720795355142.webp)

> [文档地址](https://docs.dify.ai/v/zh-hans/getting-started/install-self-hosted/docker-compose)

满足前提条件之后，**克隆 Dify 代码到本地**：

```bash
git clone https://github.com/langgenius/dify.git
```

然后**进入到源代码中的 docker 目录下，一键启动**！

```bash
cd dify/docker
cp .env.example .env
docker compose up -d
```

启动后直接在**浏览器中输入&#x20;****`http://localhost`****&#x20;即可进行访问**。

也可以使用 k8s 进行部署：（这里插入一个文件吧）

### 使用

初次访问 Dify 时需要**先设置一个管理员账号**：

![](assets/1720534522885.webp)

设置好之后正常进行登录即可：

![](assets/1720534573062.webp)

![](assets/1720795668944.webp)

到目前为止我们清楚了它长啥样子，但要正常使用还得**设置一下 AI 大模型**才可以，点击右上角的头像，选择设置唤出设置对话框：

![](assets/1720534884506.webp)

点击**左侧菜单栏中的模型供应商**开始设置你的 Dify AI 模型。我们以 OpenAI 为例，输入 API Key 和代理 Url（参考[如何免费获取 ChatGPT API Key？](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247484170\&idx=1\&sn=8dae94674046265f0687cc2bdc0a535a\&chksm=fa6860ebcd1fe9fd25c7ce5f3ed7ca3dc0bfbb7812b4ec533ddc24a444a637ddeb6acc110ba5#rd)）：

![](assets/1720795862716.webp)

![](assets/1720534927925.webp)

然后创建一个空白应用，在应用里面就可以选择模型了：

![](assets/1720535011035.webp)

测试一下看看是否能正常进行对话：

![](assets/1720796424487.webp)

哦吼～完美

### 知识库

Dify 也**支持创建知识库**，点击页面顶部的知识库 Tab，在对应的页面按照以下步骤创建一个新的知识库：

![](assets/1720535582335.webp)

![](assets/1720535613296.webp)

![](assets/1720535638698.webp)

创建好之后，我们就可以在这个知识库详情页面看到刚刚上传的文档以及是否可用：

![](assets/1720535656098.webp)

我们可以将知识库接入到刚刚创建好的应用中去：

![](assets/1720535704877.webp)

测试一下：

![](assets/1720535771662.webp)

也访问正常，**AI 回答的结果来源正是我们刚刚上传的 PDF 文档**！非常 Nice\~

### 发布

应用创建并编排好之后，点击右上角的发布按钮进行发布，除此之外 Dify 还额外提供了三个功能给我们，分别是：

![](assets/1720797200256.webp)

* **运行**：打开一个新的页面，页面 url 地址是 dify 为这个应用生成的一个唯一的 url 链接；

![](assets/1720797238940.webp)

* **嵌入网站**：这个功能其实 FastGPT 也有（不得不说，其实二者的功能很相似），就是提供三种嵌入方式：**以 iframe 的形式将 AI 应用集成到自己的网站中去**、**通过 script 脚本的方式将一段代码 copy 到网站代码中**以及**通过浏览器插件的形式来集成**

![](assets/1720797281307.webp)

* **访问 API**：提供接口的形式，将 AI 应用接入到其他的产品中

![](assets/1720797295570.webp)

以上就是 Dify 的部署及基础使用。因篇幅过长，如何接入 Ollama 以及进阶用法会在后续文章中介绍，尽情期待～
