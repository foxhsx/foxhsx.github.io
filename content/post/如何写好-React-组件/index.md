---
title: 如何写好 React 组件
date: 2025-04-23
tags: [前端]
draft: false
description: 本文探讨了在开发业务和基础组件时应遵循的设计原则，强调“面向失败设计”和组件拆分的重要性，以提升**可复用性**和**可维护性**。建议使用**TypeScript**以增强类型定义，并提到优化**命名规范**和**代码结构**的必要性。理想的组件应具备**结构清晰**、**复用性强**、**易于维护**和**可读性高**等特性。
---

无论是业务组件还是基础组件，在写对应模块时都需要注意几个原则：

* 面向失败设计；
* 如果是复杂组件，需要进行拆分，提高可复用性和可维护性；
* 抽取常量和配置；
* 最好使用 TypeScript，增加类型定义
* 对于代码结构和命名来说要进行一些优化。

细节上来说，可能有：

* 将大组件拆分成多个小组件；
* 抽取一些方法、规则到常量文件中；
* 统一命名规范，比如 handle 前缀表示事件处理函数；
* 将 UI 组件封装成独立组件，高内聚、低耦合；
* 优化代码结构，将关联性强的代码放在一起。

一个好的组件，应该符合以下特性：

* 结构清晰；
* 复用性好；
* 易于维护；
* 代码可读性强；

