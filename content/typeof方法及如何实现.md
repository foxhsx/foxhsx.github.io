---
title: typeof 方法及如何实现
date: 2021-04-17
tags:
  - 前端
description: 从面试者的角度学习 typeof 方法及如何实现
---

这也是一道很基础的题目，主要考察这个 API 的用法、缺陷及如何实现，下面我们就来一起看下。

1. 基本用法
2. 缺陷
3. 如何实现一个 typeof
4. 延伸：与 instanceof 做比较

### 基本用法

作用：获得操作值的数据类型，返回一个字符串。
语法：在 typeof 后面跟一个需要计算的数据即可，`typeof <operand> `或者`typeof(operand)`。

```javascript
typeof 1;        // "number"
typeof '1';      // "string"
typeof true;     // "boolean"
typeof [1,2];    // "object"
typeof {a: 1};   // "object"
```

这就是 typeof 的基本用法。接下来我们来看看它都有哪些缺陷。

### 缺陷

如上代码块所示，我们在求数组的类型的时候却得到了`object`，这显然不是我们预期的效果。不单单如此，我们再用 typeof 计算 null 的类型时，也会得到`object`，如下所示：

```javascript
typeof null;  // "object"

const reg = /s/;
typeof reg; // "object"
typeof new Date(); // "object"
```

可以看到，使用 typeof 的时候，对一些内置对象和特殊的值，计算得到的数据类型并不是我们预期的。这是为什么呢？我们一个个来看。

#### 1. typeof null 为何等于 object?

其实这个问题，自 JavaScript 诞生就有了，在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数值表示的。**对象类型的标签是0**。而又由于`null`代表的是空指针（大多数平台下为 0x00），所以一般情况下 null 的类型标签为 0，故而会有`typeof null === 'object'`的问题出现。

#### 2. typeof 操作有的值时为何都只能得到 object?

比如上面提到的正则表达式、Date对象和数组等等，都会得到`object`。
这个原因其实在上面提到的`typeof null`里已经提到了。`typeof`检测的时候，是按照计算机存储的二进制的值来进行检测的，所以这就导致了很多的内置对象和其他复杂数据类型的值都会被`typeof`判定为`object`，不能对其做进一步的细分。

### 如何实现一个 typeof ?

抛开以上提到的缺陷，我们要自己实现一个`typeof`，需要怎么实现呢？
`Object`提供了一个`toString`的API，我们使用它可以实现一个比较准备的 typeof 方法：

```javascript
function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

toRawType(null) // 'Null'
toRawType(1)    // 'Number'
toRawType('1')  // 'String'
toRawType({})   // 'Object'
toRawType([])   // 'Array'
toRawType(true) // 'Boolean'
```

那为什么使用`toString`就可以得到对应值的数据类型呢？
其实每个实例都有一个`[[Class]]`属性，这个属性中就指定了上述字符串中的 type（构造函数中）。`[[Class]]`不能直接被访问，但是通常可以间接通过在这个值上借用默认的`Object.prototype.toString.call(...)`方法调用来展示。

### 与 instanceof 做比较

其实实际上来说 instanceof 更倾向于判断引用数据类型，就跟它的定义一样：用来检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。也可以理解为当前对象是不是某个类的实例。instanceof 操作符在检测过程中也会将继承关系考虑在内，所以 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。

而 typeof 则是直接返回一个字符串，表示当前值的数据类型，对于大多数的引用数据来说，不会判断是否是某个类或者数组，它只会返回 object。
