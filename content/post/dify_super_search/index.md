---
title: Dify15. 工作流分享-搜索大师
date: 2025-01-02
description: Dify 工作流分享-自己搭建搜索引擎实现的搜索大师
tags:
  - AI
  - Dify
---

之前给大家分享过一个搜索相关的 Dify 工作流：《[Dify 工作流分享-AI ](https://mp.weixin.qq.com/s/6z9B68yJ4-8m7DBmWFgpqw)*[搜索](https://mp.weixin.qq.com/s/6z9B68yJ4-8m7DBmWFgpqw)*[与分析](https://mp.weixin.qq.com/s/6z9B68yJ4-8m7DBmWFgpqw)》。

这个工作流的作用主要是将搜索出来的内容进行整理划分，最终以表格 + 主题内容的形式输出给用户。类似这样：

![](assets/QtvHIU8RSurnxjUbJ-S_LuJzefcWdSzUGjZTrcaEa5c=.webp)

里面主要用到的搜索应用是 TavilySearch，这是一款收费的 AI 搜索应用，每月有 1000 次的免费额度，用完还想用就得充钱。

今天要分享的是另外一种形式的搜索大师，搜索引擎也可以自己搭建（参考文章《[AI ](https://mp.weixin.qq.com/s/XJLAVBdrs1yhIn9sIANMOw)*[搜索](https://mp.weixin.qq.com/s/XJLAVBdrs1yhIn9sIANMOw)*[前传-13.1k Star 的本地 ](https://mp.weixin.qq.com/s/XJLAVBdrs1yhIn9sIANMOw)*[搜索](https://mp.weixin.qq.com/s/XJLAVBdrs1yhIn9sIANMOw)*[应用 SearXNG](https://mp.weixin.qq.com/s/XJLAVBdrs1yhIn9sIANMOw)》），最终会形成类似一个 AI 搜索应用的 Workflow。废话不多说我们一起来看看效果吧～

![](assets/k3sMIdyDNXascCD5N8TjxiAYYfr7uo51XwhHlBFFTA8=.webp)

相较于之前那个，这个输出的内容更精简，可以将其用作每日简讯的来源。

这个工作流除了开始和结束节点之外，需要 7 个节点：

* LLM-问题分解器：将原问题拆分成相似的多个问题
* Code-问题数组：将上一步 LLM 生成的内容分割成数组
* 迭代器-循环搜索：将上一步接收到的数组循环通过 SearXNG 进行搜索
* Code-URL 收集器：将搜索到的 URL 收集到一个数组中，考虑到输出的大小，我们这里只放 10 个数据
* 迭代器-整理收集结果：通过 JinaReader 来访问 URL，并将网页内容输出给 LLM 进行总结，最终将 10 次迭代的内容聚合到一起
* Template-聚合内容：这个不多解释了
* LLM-再次整理总结：将聚合器传过来的内容再做一次总结
* 最后输出

也可以关注三金，后台发送 DSL，三金将这里收集到的所有 DSL 分享给你～

今天就到这里啦！大家元旦快乐～

> 本文参考：[dify-dsl](https://github.com/Winson-030/dify-DSL)
