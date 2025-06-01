---
title: 1. Hugo 入门
date: 2025-03-30
tags: [代码人生]
draft: false
description: 该文章探讨了作者对博客框架的多次更换经历，最终选择了**Hugo**，主要因其**速度**优势。文章对比了多个框架，包括**Hexo**、**VuePress**、**VitePress**和**Next.js**，指出每种框架的优缺点，特别强调了Hugo的快速编译与简单配置。作者提供了Hugo的安装方法及常用命令，强调其易用性和主题丰富性，尤其适合不追求复杂功能的用户。
---

我经常会更换我的博客架构，从最初的 hexo 到 vuepress 再到 vitepress 再到 Next.js 最后到现在的 Hugo。

为什么要这么折腾？其实我也不知道，可能终究就是对博客框架本身不够满意，目前 Hugo 还在尝试中，最后也不知道会不会再次将它换掉。

选择 Hugo 的原因是因为它的**速度**，这是它的产品亮点！

相较于其他几款产品来说，它的底层是用 go 写的，所以生成速度超级快，而且命令上也比较简单（当然命令也用不了几次）。

## 框架对比

这里简单说一下这几款产品在使用后的体验：

### hexo

市面上大多数人首次接触的静态站点生成器应该就是它了，常用命令就那么几个，主题非常丰富，中文资料也相对比较齐全，有的大佬都在这上面玩儿出花来了。

不过相对应的，主题丰富了，可定制化就比较强，上手就比较复杂。且在文章内容过多的时候，整个编译任务下来需要好几分钟（我觉得大多数可能不太在意）。

### vuepress

前端 Vue 框架的生态之一，后面 vite 出来之后，大多数人都转战 vitepress 了，未来发展实属危险，就不多说了。

### vitepress

其实和 vuepress 差不多，只不过搭上了 vite 的风，在编译速度上由于 vuepress，整体是文档风，博客主题比较少，我之前用的时候，虽然写的是博客，但是整体看起来是文档风格的博客……

### Next.js

React 的宠儿，现在官网生成项目的教程都是 Next.js，上手难度有一点，对于前端来说应该还好，但是不是前端的话，就比较难受了。

也有博客主题，不过比较少，而且用了一段时间，有一些 UI 上的 bug，所以最终也换掉了。

### hugo

除了开始说的编译速度快之外，主题其实也挺丰富的，而且它的配置相对来说比较简单，不考虑整活儿的话，用它准没错。

## 安装

hugo 和 hexo 在安装上都差不多，都有提供终端命令，且支持不同的操作系统。

### MacOS

#### Homebrew

```bash
brew instll hugo
```

#### MacPorts

```bash
sudo port install hugo
```

还有源码打包的方式，不说了，麻烦。

> Hugo 有三个版本：标准版、扩展版和扩展/部署版。标准版提供核心功能，而扩展版和扩展/部署版则提供高级功能。 我们按照上述安装方式下载的版本，一般是扩展/部署版。

### Linux

#### Snap

Snap 是一款开源免费的 Linux 软件包管理器。安装简单，可自动更新。

```bash
sudo snap install hugo
```

> 文档上还有「开启/撤销」可移动媒体访问权限以及 SSH keys 的权限，这个不了解，不多说。

#### Homebrew

你没看错，这玩意儿在 Linux 也可以用：

```bash
brew install hugo
```

### Windows

Windows 系统最简单了，直接到 Github 上下载个包就行。[latest release](https://github.com/gohugoio/hugo/releases/latest)

## 常用命令

###### 查看版本

```bash
hugo version
```

###### 创建一个站点

```bash
hugo new site myBlog
```

###### 设置博客主题

```bash
cd myBlog

# 在当前目录中初始化一个空的 Git 存储库。
git init

# 将 Ananke 主题克隆到主题目录中，并将其作为 Git 子模块添加到您的项目中。
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke

# 在站点配置文件中附加一行，指示当前主题。
echo "theme = 'ananke'" >> hugo.toml
```

###### 启动本地开发环境

```bash
hugo server -D
```

访问 `http://locahost:1313` 查看启动的项目。

###### 增加文章

在 hugo 中文章内容都放在根目录下的 content 文件夹里，而 content 目录中一般根据博客主题来决定会有几个子目录（需要自己建立，这个主要看博客主题都有啥），比如大多数博客会有下面三个子目录：

* posts：文章内容目录
* about： 关于
* categorites: 分类

使用下述命令快速生成一篇文章：

```bash
hugo new content content/posts/my-first-post.md
```

文章内容如下：

```markdown
+++
title = 'My First Post'
date = 2024-01-14T07:07:07+01:00
draft = true
+++
```

这里的 draft 值需要注意以下，一般来说，Hugo 在构建网站时不会将草稿（draft）为 true 的文章发布出去。想要了解这里的规则，需要看下[相关文档](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content)。

如果在文章中配置了以下内容，在 build 的时候不会发布这些内容：

* draft 为 true；
* date 是将来的日期；
* publishDate 是将来的日期；
* expiryDate 是过去的日期；

###### 打包

直接使用 `hugo` 命令进行打包即可，如果说想把草稿也一起进行打包需要加 `-D` 的参数。

