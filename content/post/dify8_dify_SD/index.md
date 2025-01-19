---
title: Dify8 给 Dify 接入 SD 实现 AI 绘画自由
date: 2024-08-03
description: 使用部署好的 Stable Diffusion，将其接入到 Dify 中，既可以在 Agent 中使用也可以在工作流 Workflow 中使用。
tags:
  - AI
  - Dify
---
Dify 中也支持接入 Stable Diffusion AI 绘画、DALLE 2 和 3 绘画，不过在国内使用 DALLE 绘图比较麻烦，如果能使用 DALLE 还不如一步到位使用 MJ，不巧的是这俩三金都没有。

所以前几天三金在电脑上部署了下 SD（[MacOS 部署 Stable Diffusion 实现 AI 绘画自由](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485177\&idx=1\&sn=8fcbb0338f8211d433c21953858df909\&chksm=fa686518cd1fec0e470341b1c83e6f8d75bd66dc0f27d97b60c3919a0fbe8a85c8c5ec1cb3ae#rd)），并从 C 站上下载了**XXMix\_9realisticSDXL**模型来试试水。

以下是三金这两天使用 SD 生成的图片：

> **prompt**: (masterpiece, detailed, cyberpunk, dramatic lighting:1.3), mesmerizing xxmixgirl character, detailed feminine features, intricate facial expressions, time square background filled with neon lights and bustling crowds, cyberpunk elements subtly integrated, shadowy atmosphere enhancing the mood, lighting inspired by Bill Sienkiewicz's style, dynamic composition, vibrant colors contrasting with dark shadows, intense and dramatic ambiance, SimplepositiveXLv1 filter at 70% opacity for a touch of modernity and edge.

一个赛博朋克风格的小姐姐就此诞生啦～

> **prompt**: (masterpiece, surreal, dramatic lighting, detailed:1.3), enchanting xxmixgirl character silhouetted against a beautiful sunset, intricate details in the scene, surreal atmosphere created by the lighting, shadows adding depth and mystery, inspired by the styles of Brandon Woelfel and Ryan McGinley, lo-fi analog filter resembling Kodak film, warm tones enhancing the sunset, dreamlike quality to the setting, captivating and serene vibe, focusing on the beauty of the moment and the character, rich storytelling through light and shadow play.

![](assets/ywjmxT4evxAaItUhRRnCc9GxWmpyH9MItnVdXXzW174=.webp)

接下来我们就将 SD 接入 Dify 看看。

### 接入 Stable Diffusion

首先，我们要 Dify 的工具页面，设置 Stable Diffusion 授权：

> ⚠️注意：如果要使用 SD 的 API 服务，在 MacOS 和 Linux 系统上需要使用 `./webui.sh --api --listen`命令启动 SD，Windows 系统则是通过 `./webui.bat --api --listen`启动。

这里 SD 的服务器地址如果是本地部署的就写：`http://host.docker.internal:7860`；如果是部署在云服务器上的就写「服务器 IP:7860」。

然后模型名称就是截图红框框住的部分，比如三金的模型名 xxmix9realisticsdxl\_v10，不需要点号后面的内容即可。

![](assets/BB5T0cH8vA1ypMcgklcJ9qmNTaMZymHWUGoNDVid6uI=.webp)

设置好之后点击保存，没啥问题我们就可以使用 SD 了。

### 在应用中使用

我们新建一个 agent 应用，里面可以嵌入工具：

![](assets/Yf4IU3MLqvv6-TUiQojCt_yfzsf8a_gWWbsYgjt7zPI=.webp)

![](assets/2fBLwOCJjgDIiLmyzdLiTfOEWdpMrB_Gwd_XCtOY7-4=.webp)

这样我们就在这个 agent 中加入了 Stable Diffusion 绘图工具啦～

先来试试它的普通对话能力：

![](assets/y9A7qZ_-_a72EG7noxR-l34MKIL8iIR55ounFyzsPoQ=.webp)

可以正常使用，接下来我们试试 Stable Diffusion 的绘图能力。

> **Prompt**: (detailed, surreal, contemporary:1.2), xxmixgirl portrayed in a surreal setting with intricate details, blending gradients of contemporary artistry, immersed in nature with a touch of street-art and urban-life elements, vibrant colors and emotions captured in a photographic style, inspired by Marta Bevacqua's work, rich storytelling through portraits, lo-fi analog filter reminiscent of Kodak film, dreamlike and ethereal atmosphere, depth in character expression and surroundings, a fusion of art and photography creating a visually stunning and contemplative scene.

![](assets/pWTlkbhJTzx2q1EXXh_z9eMGSyBBA0sx8rO9o-36ih8=.webp)

![](assets/PVWpa8zKw2WvA-OveMQnSFUKrSHfo9_lO0DL4n081oI=.webp)

生成的图片太大了，三金压缩了一下，但是压缩过后有些糊？emmmm，但是也还可以吧😂

接入到微信中试试（[如何将 39.3k 的开源知识库 Dify 接入微信](https://mp.weixin.qq.com/s?__biz=MzUyODkwNTg3MA==\&mid=2247485151\&idx=1\&sn=22cbef91d44d7211e2ec71835a0faafd\&chksm=fa68653ecd1fec2883fbe8c428a62c9528f57e3f458ca9c1bc2ff45546edcc9fd50a5373ef6e#rd)）：

![](assets/reRN9rt5bAOND2Kc92S3NVT1ryXU4loyOU8Ck0uuktg=.webp)

> 压缩后该糊就糊，看官们轻点喷，但是生成的原图是高清的

如果要实现 dify 能够有识图及出图的能力，使用 Agent 是必须的，除了可以使用工具外也可以添加知识库，对于大模型的选择上，需要选支持识图的模型，比如 gpt-4o 等。绘图除了 Stable Diffusion 之外，还可以授权 DALLE 绘图。
