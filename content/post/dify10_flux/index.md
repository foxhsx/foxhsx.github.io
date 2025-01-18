---
title: Dify10. 在 Dify 中接入 Flux 和 Stable Diffusion
date: 2024-12-10
description: 硅基流动提供的免费限免模型，包括对话、嵌入、重排序、语音、视频等类型。在 Dify 中使用时需填入硅基流动的 API Key 即可。
tags:
  - AI
  - Dify
---

之前有出过两篇关于本地部署及使用 AI 绘图应用 Stable Diffusion 的文章：

* [MacOS 部署 ](https://mp.weixin.qq.com/s/JZ6Hflg6-ZcYbRYGrcfabw)*[Stable](https://mp.weixin.qq.com/s/JZ6Hflg6-ZcYbRYGrcfabw)*[ Diffusion 实现 AI 绘画自由](https://mp.weixin.qq.com/s/JZ6Hflg6-ZcYbRYGrcfabw)
* [给 Dify 接入 SD 实现 AI 绘画自由](https://mp.weixin.qq.com/s/vIUycZfhlFTGhhSSDcUJ6g)

后面因为电脑出图还是有点慢，所以基本没咋用，以至于 Flux 出道以来也没有玩儿过。不过幸好「硅基流动」有提供：

* 免费的 Flux 在线体验，出图速度非常快！
* 还**提供了 API 服务**

到目前为止硅基提供了一些比较火的 AI 大模型，都是限时免费，有需要的小伙伴抓紧冲！！

### Siliconflow 硅基流动限免 AI 大模型

> [硅基流动](https://cloud.siliconflow.cn/i/vhHfOKhq)

除了 Flux 限免之外，可以生成图片的限免模型还有 Stable Diffusion。没错！目前这两款市面上比较火的生图模型，硅基目前都免费开放给用户使用。

限免的模型种类从功能上来说有五种，分别是：

#### 对话（这里只举例 7B 及以上的模型）

* `Qwen/Qwen2.5-7B-Instruct`
* `Qwen/Qwen2.5-Coder-7B-Instruct`
* `internlm/internlm2_5-7b-chat`
* `meta-llama/Meta-Llama-3.1-8B-Instruct`
* `Qwen/Qwen2-7B-Instruct`
* `THUDM/glm-4-9b-chat`
* `01-ai/Yi-1.5-9B-Chat-16K`
* `google/gemma-2-9b-it`
* `AIDC-AI/Marco-o1`

这些模型一般可以用在 AI 对话的场景中。

#### 嵌入（Embedding）

* `netease-youdao/bce-embedding-base_v1`
* `BAAI/bge-m3`
* `BAAI/bge-large-en-v1.5`
* `BAAI/bge-large-zh-v1.5`

在 AI 知识库这一领域，Embedding 模型是非常重要的，所以对于想接触这一方面的朋友来说，可以先使用这几个免费的嵌入模型试试水。

#### 重排序（Rerank）

* `netease-youdao/bce-reranker-base_v1`
* `BAAI/bge-reranker-v2-m3`

同嵌入模型一样，AI 知识库在结合 Rerank 模型之后，可以增强知识库的检索能力，建议二者搭配使用。

#### 语音

* `FunAudioLLM/SenseVoiceSmall`

之前 AI 语音大火的时候，有大佬搞过智能生成 AI 播客的 Bots，很是惊艳～

#### 视频

* `Lightricks/LTX-Video`

AI 生成视频不用多说，现在比较热门的短视频平台上，就有大佬使用 AI 生成一些比较科幻又热血的作品，令人印象深刻的就是「豆撅子精」（不知道有没有山东的朋友刷到过）

感兴趣的小伙伴可以白嫖一波～

> [硅基流动](https://cloud.siliconflow.cn/i/vhHfOKhq)

### 在 Dify 中使用

在 Dify 中内置了 SiliconFlow 的工具，只需要填入 SiliconFlow（也就是硅基流动）的 API Key 就可以使用 Flux 和 Stable Diffusion：

![](assets/0u0gBp4L39VZtrOxkXmuU2d6xPJa06AmOeY4K4yHT9Y=.webp)

> 如何获取 SiliconFlow 的 API Key 呢？[入口
> ](https://cloud.siliconflow.cn/i/vhHfOKhq)通过上面提供的硅基流动链接进入到官网之后，在左侧菜单「API 密钥」中心新建即可～如下图

![](assets/sGojQPFIkOr236qbaGlXIaU278kOX6iJi31_4bfsSag=.webp)

授权好之后我们就可以在 Agent 和工作流中使用了～

### 测试

我们直接在 Agent 中测试即可，在工作流中只要使用对应的工具，最终的效果是一样的。

创建一个 Agent，并在其中使用 SiliconFlow 工具：

![](assets/VNiLNFxBPrrDkOW3N0hwJfqRlPAbz8-dKKAp68ZUtEA=.webp)

为了测试方便，我们先使用 Stable Diffusion，再使用 Flux。

##### Stable Diffusion

使用之前用过的提示词画一个赛博朋克风的小姐姐～

![](assets/OEZRsyIbziuYNIGI-puG4VOMepC_rv51Vx96Pn7yeDM=.webp)

原图在这里，很赛博朋克啊朋友们～

![](assets/sDINR7VOTD54J2_5OxaQxxxwfvzaMFmDlrlZyRmIQdQ=.webp)

##### Flux

接下来试试 Flux，看看效果如何，这次画一个类梵高的作品：

![](assets/SKpGnt-zyOZMmmKXIkVyiSZcd6UkD5hXYcPsPdCBnVw=.webp)

> 其他不说，出图速度真的快，8s 就出来了。要是用我自己的电脑，每个几分钟出不来。下面是画出来的原图

![](assets/UjC7H9kJlEjmM8HrvHZpCUUn69zCf7GwWtQJp-KWGWw=.webp)

也超级接近。有需要的朋友赶紧行动起来吧～
