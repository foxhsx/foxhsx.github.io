---
title: 8.9k Star！使用 AI 学习 Dify 项目的系统设计图
date: 2025-04-09
tags: [AI]
draft: false
description: 本文介绍了学习开源项目源码的辅助工具GitDiagram，特别针对Dify项目的学习需求。核心观点是通过GitDiagram生成项目关系图，帮助用户快速理解复杂源码结构。关键词包括“GitDiagram”、“关系图”、“开源代码”、“自定义指令”、“私有仓库”。该工具提供多种功能，如模块跳转、图表导出、缩放，以及支持访问私有仓库，旨在提升学习效率，适合希望深入源码的开发者。
---

大家好，这里是三金～

最近有一位粉丝朋友私信我，他想要学习一下 Dify 的项目源码，但是苦于项目过于庞大复杂，有一种无从下手的无力感，问我有没有什么比较好的方法可以快速入手？

![](assets/Es0EM8dOe81oDD9Q_QT1ftpcG4ZhyDGcoROqSteto3k=.webp)

说实话我对源码没有研究过，大多数时间都在应用层面和探索封面，不过我推给他之前看到的一个学习开源代码辅助工具——GitDiagram。

这个工具具体有什么用呢？

- 访问 GitDiagram 官网：https://gitdiagram.com/

![](assets/Jxuau_SVMTycxEDth3Cs9VJURhBz2hGJT8exoNs5RBI=.webp)

- 只需要在网站中提供的输入框中输入想要学习的 Github 仓库地址即可。这里我们以 Dify 为例：

![](assets/ytiPJykgAYYPFqsngPkeuso2nht63FV6rnjXTjiUypo=.webp)

![](assets/h4_wzA-z_y4BTegDahSBc2aOD2yt6gxy_88RlDRnaUc=.webp)

可以看到很快就生成了项目的关系图，这对于学习项目源码来说真的很有用，万事开头难，这一步算是利用 GitDiagram 解决了。

GitDiagram 提供了五个功能：

- 点击关系图中的模块可以跳转到对应的项目目录下；

![](assets/Nh8k0dABHGy5rooc947nnURQWhHpyWiQMmiS_uNv9Tk=.webp)

![](assets/miZ1ikq90IWnxf23qN7Syw5koEzueGt01nCroQgbg3s=.webp)

- 自定义指令修改和重新生成图表；

![](assets/F_qkkWeqGfj_3TXt0m7L5Wu9tglsZnXkye2oOV1prUc=.webp)

这个功能我在使用的时候遇到一些问题——因为 Dify 项目过于庞大需要消耗的 token 过多被拦截了：

![](assets/JWJtcqc00L5fAkN2e19kcD3pk3R0SkovL1Bvp-W6tCg=.webp)

不过情有可原，毕竟网站中使用的 o3-mini 模型是项目作者本人在垫付，能免费提供给大家使用真的已经用爱发电了！

如果有需要自定义图表的小伙伴可以使用自己的 API Key（只支持 OpenAI 的模型）：

![](assets/sbkJCKEY3JxgAc0ew8jJ-k7CMvYyFcXIu_G6JeTtpXg=.webp)

有想使用其他模型的需求，可以到 Github 上提 issue 或者拉取源代码自行进行修改和部署。Github 地址：https://github.com/ahmedkhaleel2004/gitdiagram

- 导出图表功能，支持导出 PNG 和复制 Mermaid.js 代码；

![](assets/wLBXFBYpdwl7MUpFOKmZ1uyqTdTNmYlClcj-sQZXFto=.webp)

- 如果项目设计图比较复杂，导致生成的图片内容比较小，还提供了缩放功能；

![](assets/PWD3rUkIeL_OB2GFnOLScdGVfqPw3mHoFlAllx9WRJo=.webp)

- 支持访问私有仓库，不过如果大家有私有仓库的需求，还是建议自己部署，防止仓库代码泄漏。

![](assets/A1DFIS-zh3M9srFFFIrj8qUYBdoqzbxYT4T5-mqfjmk=.webp)

以上就是关于 Diagram 相关介绍，大家也可以通过它来辅助学习其他开源项目。感兴趣的小伙伴可以去试试～

这里也献上该项目的 Github 地址：[https://github.com/mingrammer/diagrams](https://github.com/ahmedkhaleel2004/gitdiagram)

如果对您有用，也可以给项目点个 Star～
