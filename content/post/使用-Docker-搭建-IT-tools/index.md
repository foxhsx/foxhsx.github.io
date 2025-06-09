---
title: 使用 Docker 搭建 IT-tools
date: 2025-06-10
tags: [docker]
draft: false
description: 本文介绍了开发人员在日常工作中使用的多种工具，强调了这些工具的集成平台it-tools。核心主题在于通过Docker、Docker Compose和Kubernetes进行该平台的部署。关键词包括：JSON格式化、YAML格式化、加密/解密、Base64转换、JWT解析等。文章提供了具体的部署示例，便于用户快速搭建环境，以提升开发效率。
---

<p>作为一个开发人员，在平时的开发中，可能需要用到很多工具来协助我们开发，比如：</p><ul class="tight" data-tight="true" style="list-style-type: [object Object]"><li><p>格式化 JSON 字符串</p></li><li><p>YAML 格式化</p></li><li><p>加密/解密文本</p></li><li><p>Base64 文件转换器</p></li><li><p>JSON 转 YAML</p></li><li><p>YAML 转 JSON</p></li><li><p>URL 解析器</p></li><li><p>JWT 解析器</p></li><li><p>JSON 差异对比器</p></li><li><p>文本比较</p></li></ul><p>等等等等，而这些都被集成到了 it-tools 里，我们可以选择在自己的服务器上使用 docker 快速一件部署，也可以直接使用原作者部署好的地址 <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://it-tools.tech/">it-tools</a>。</p><p>接下来，我将介绍如何使用 docker、docker compose 和 k8s 来进行部署。</p><blockquote class="blockquote"><p>这里我们在拉取镜像是时候，使用 nightly 分支，因为这个分支上有完整的中文，latest 上的中文，只有左上角的标题</p></blockquote><h3>docker</h3><pre vnode="true" code="version: '3.9'
services:
it-tools:
image: 'corentinth/it-tools:latest'
ports:
- '3075:80'
container_name: it-tools
restart: unless-stopped" language="yaml" linenumbers="true" wordwrap="false" tabsize="2" shouldfocus="false"><code>version: '3.9'
services:
it-tools:
image: 'corentinth/it-tools:latest'
ports:
- '3075:80'
container_name: it-tools
restart: unless-stopped</code></pre><h3>k8s</h3><pre vnode="true" code="apiVersion: apps/v1
kind: Deployment
metadata:
labels:
app: it-tools
name: it-tools
namespace: default
spec:
replicas: 2
selector:
matchLabels:
app: it-tools
template:
metadata:
labels:
app: it-tools
spec:
containers:
- image: 'corentinth/it-tools:latest'
imagePullPolicy: Always
name: it-tools
restartPolicy: Always" language="yaml" linenumbers="true" wordwrap="false" tabsize="2" shouldfocus="false"><code>apiVersion: apps/v1
kind: Deployment
metadata:
labels:
app: it-tools
name: it-tools
namespace: default
spec:
replicas: 2
selector:
matchLabels:
app: it-tools
template:
metadata:
labels:
app: it-tools
spec:
containers:
- image: 'corentinth/it-tools:latest'
imagePullPolicy: Always
name: it-tools
restartPolicy: Always</code></pre><p>以上每个标题对应不同的执行环境。</p><p>部署好之后即可输入公网IP+端口号进行访问了：</p><img height="auto" style=" " src="assets/1749478162215.webp" flipx="false" flipy="false" originwidth="1092" originheight="528.3125" width="100%"><p></p><p></p>
