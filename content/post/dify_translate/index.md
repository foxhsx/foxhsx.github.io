---
title: Dify14. 工作流分享-复刻吴恩达教授的 Agent Workflow 翻译
date: 2024-12-07
description: Dify 工作流分享——复刻一下吴恩达教授的 Agent Workflow 翻译
tags:
  - AI
  - Dify
---

前一段时间吴恩达教授开源了一个专注于翻译的 AI Agent——translation-agent。

这个 translate-agent 主要以 AI 大模型为翻译引擎，再通过在工作流中增加一些针对性的建议和反思，辅以提示词设定输出风格、处理习语和特殊术语、指定语言使用或方言等，使之更易于翻译出比较符合当地语言的内容。

> [Github 地址](https://github.com/andrewyng/translation-agent)

我们今天在 Dify 中通过可视化工作流的方式来复刻一下这个 AI Agent～

![](assets/mYDyhxfF2wlUOFHOb4ddcYfOJSG5DAY6UAPvevJP1tw=.webp)

### 准备工作

* AI 应用——Dify，可以本地部署也可以使用官方提供的地址

> 本地部署参考文章：[37.4k 的 ](https://mp.weixin.qq.com/s/m7_AnblivDdHAasN09IWHw?token=1042651127\&lang=zh_CN)*[Dify](https://mp.weixin.qq.com/s/m7_AnblivDdHAasN09IWHw?token=1042651127\&lang=zh_CN)*[，一款小白也可以轻松上手的大模型开发平台（一）：部署及基础使用](https://mp.weixin.qq.com/s/m7_AnblivDdHAasN09IWHw?token=1042651127\&lang=zh_CN)**[原创](https://mp.weixin.qq.com/s/m7_AnblivDdHAasN09IWHw?token=1042651127\&lang=zh_CN)**

* AI 大模型：工作流中使用的大模型深度求索家的 deepseek-chat，我们下面会大概介绍一下

### 注册 deepseek

访问 deepseek 的[官网](https://www.deepseek.com/)，选择接入 API（新用户会免费获取 500w 的 token 哦～）。

![](assets/LYiSBwaEYNae8DV-l6bTY-QTH7bZ88iS6coj0W4nf2w=.webp)

在 API Keys 页面，创建一个名为 dify 的 key:

![](assets/iH74S04i0jnKSwm8cjq7B_22ZX4zIrWub3_C3SSMWWs=.webp)

这里要记得保存下生成的 Key 哦，Key 的值只在创建时展示一次！

### 绘制工作流

回到 Dify 中，我们先要将 deepseek 接入到模型供应商中：

![](assets/tu6Lr06ooech01IrXSCzNWZeKXL6TJjGpz8VD87S7o8=.webp)

这里不需要设置代理地址，deepseek 国内直连～

然后新建一个工作流，起名就叫 translate-agent，它需要 7 个步骤，一共 8 个节点：

* 开始节点：需要用户提供——目标语言、原始内容、原始语言、国家（可选）；
* LLM 节点：用来将用户输入的内容翻译为目标语言；
* 条件分支节点：判断用户是否有输入 country 的变量；
* LLM 节点-建议：如果没有 country 的变量，AI 大模型会根据翻译后的结果再给出一次优化建议；
* LLM 节点-根据输入的 country 进行建议：译文的最终风格和语气都会与目标语言所在的国家口语风格相符；
* 变量聚合器：上面两个 LLM 节点的输出最终都会聚合到这个节点上进行输出
* LLM 节点：根据建议，优化一次翻译内容
* 结束：最终输出到用户

### 测试

我们节选一段《小王子》中的内容来测试一下这个工作流：

> 原文：
> *“Just that,” said the fox. “To me, you are still nothing more than a little boy who is just like a hundred thousand other little boys. And I have no need of you. And you, on your part, have no need of me. To you, I am nothing more than a fox like a hundred thousand other foxes. But if you tame me, then we shall need each other. To me, you will be unique in all the world. To you, I shall be unique in all the world...”*

看！翻译得多好～和我看过的译文一摸一样：

![](assets/uFIk24y38gX8ksDMVRf5JiMqiZsY8L9BgKCTz5wWXZA=.webp)

但是这样我反而觉得这可能是模型数据中有这些内容，所以试试将诗词翻译成英语看看：

> 原文：君不见黄河之水天上来，奔流到海不复回

![](assets/Krs0_bL7HwnYG6Wbdwm1ZEh4YomfL5V2PKi99_PIjoM=.webp)

> 译文翻译：你没有看到黄河的水从天上降下来，冲向大海，永不返回吗？

😂对不起，难为你了

但是反着把这个英文再让它翻译时，输出的结果倒是有点原诗词那味儿了！

![](assets/JB1qZIJyJ9j9pt2hWPDQ7YSMsYIcCwGKD83vyebN1iU=.webp)
