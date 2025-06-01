---
title: 3. Github Actions 自动部署
date: 2025-06-01
tags: [代码人生]
description: 如何使用  Github Actions 自动部署 Hugo 博客
---

在 Github 上创建一个仓库，仓库名为 `<你的 Github 账号>.github.io`，然后选择 Actions 菜单，在里面搜索 Hugo，直接使用 Github 提供的这个 Workflow 即可。

这里我踩了一个坑，今天写记录的时候回想起来我貌似改错了人家的 Workflow 了，在 hugo 打包的那块，因为文章中有 draft 参数的存在，导致打包出来的都是空包，所以我在打包那块加了一个 `-D` 的参数，这和 Hugo 的设计理念是冲突的，根本的解决方案是需要修改文章头部的 draft 配置。

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["master"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.140.2
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
        run: |
          hugo \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

在这段 YAML 中我们看到只有在 push master 时才会触发 Github Actions 的工作流，这里记得不要直接 push。

还有一个比较重要的点是 `HUGO_VERSION` 字段最好和咱们本地的 hugo 版本保持一致，只需要修改数字即可～
