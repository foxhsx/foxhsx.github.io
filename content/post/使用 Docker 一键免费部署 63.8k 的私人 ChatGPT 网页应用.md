---
title: 使用 Docker 一键免费部署 63.8k 的私人 ChatGPT 网页应用
date: 2025-03-06
tags: [AI]
draft: false
description: ChatGPT 刚开始出道时，这个开源项目火到直接被收购，可见其当时的影响力。虽然现在 UI 和功能不如其他一些 AI 应用，但也有一定的参考价值
---

这次要介绍的也是一个 AI 项目，而且在 Github 上的 star 比上次介绍的 gpt4free 的项目还要多，足足 63.8k！

它就是可以一键免费部署私人 ChatGPT 网页应用，并支持 GPT3, GPT4 & Gemini Pro 模型的 NextChat（项目名叫 ChatGPT-Next-Web）。

[github 地址](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)

![](https://note.ihsxu.com/api/imgs/1710083880089.webp)

### 如何部署

镜像拉取：

```shell
docker pull yidadaa/chatgpt-next-web
```

run 起来：

```shell
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=页面访问密码 \
   yidadaa/chatgpt-next-web
```

> 没有 openAI\_API\_KEY？没关系，***下一篇我会介绍另一款强大的项目，让你拥有免费的 API Key***:😏:

一般来说到这里就可以了，我们使用 `IP + 端口（3000）` 就可以访问到刚刚部署好的项目了：

![](https://note.ihsxu.com/api/imgs/1710085130308.webp)

不过这个时候还没法直接用，需要通过对话框里提供的「登录」或者「设置」链接跳转到这个页面进行密码或者 API 秘钥的设置：

![](https://note.ihsxu.com/api/imgs/1710085270264.webp)

设置完之后因为使用的是免费的 API\_KEY，所以这里还需要在设置中配置一下「自定义接口」，否则也无法正常进行对话：

![](https://note.ihsxu.com/api/imgs/1710134282736.webp)

点击左下角的设置图标进入到设置页面，找到「自定义接口」并开启之后，设置接口地址和 API Key：

![](https://note.ihsxu.com/api/imgs/1710134175949.webp)

> ***接口地址和免费 API Key 的获取会在下一篇文章中更新～***

然后我们就可以正常使用了：

![](https://note.ihsxu.com/api/imgs/1710085550380.webp)

### 补充

在 NextChat 中还提供了面具的功能，它其实就是预设了一系列的角色，可以让使用者针对一些场景快速创建对话。

![](https://note.ihsxu.com/api/imgs/1710135322213.webp)

![](https://note.ihsxu.com/api/imgs/1710135455520.webp)

它会快速进行回答，并携带一些图片（这里没展示出来，提供的图片地址访问不了）：

![](https://note.ihsxu.com/api/imgs/1710168332540.webp)
在面具功能的旁边还有一个插件功能，不过还在开发中。

大家感兴趣的话可以自己试试看～

### k8s 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: next-chat
spec:
  replicas: 1
  selector:
    matchLabels:
      app: next-chat
  template:
    metadata:
      labels:
        app: next-chat
    spec:
      containers:
      - name: next-chat
        image: dockerpull.org/yidadaa/chatgpt-next-web
        ports:
        - containerPort: 3000

---
apiVersion: v1
kind: Service
metadata:
  name: next-chat
spec:
  selector:
    app: next-chat
  type: LoadBalancer
  ports:
  - port: 3000
    targetPort: 3000
```

