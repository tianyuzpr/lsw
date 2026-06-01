# LSW - Linux Subsystem for Windows

> 这是一个空气项目，它不存在，它不存在，它不存在，看个乐就好，欢迎PR/Issue。

## *"因为WSL存在，所以LSW必须存在"*

[![License](https://img.shields.io/badge/license-OMGWeDontHaveLicense-brightgreen.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-f**kware-red.svg)](https://github.com/tianyuzpr/lsw)
[![Contributing](https://img.shields.io/badge/contributing-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📕 目录

- [项目背景](#-项目背景)
- [项目简介](#-项目简介)
- [核心特性](#-核心特性)
- [技术栈](#-技术栈)
- [编译](#-编译)
  - [编译环境](#编译环境)
  - [编译所需软件](#编译所需软件)
  - [编译过程](#编译过程)
  - [编译过程（带图）](#编译过程带图)
  - [编译结果](#编译结果)


## 🖼️ 项目背景

本人是一个Windows + Linux的双系统用户，但是有一些Windows专有软件，我需要在Linux上运行。然而，wine的兼容性实在是太 **“高”** 了，所以我们需要一个 **内核级别的子系统** 来解决这个问题。

## 🎯 项目简介

**LSW** (Linux Subsystem for Windows) 是一个革命性的项目，它让Windows应用程序能够在Linux系统上原生运行。

等等，这不就是Wine吗？

不！Wine是用户态翻译，LSW是**内核级子系统**！

等等，这和虚拟机有什么区别？

区别在于...我们叫它"子系统"而不是"虚拟机"！

等等，这不就是WSL2的反向实现吗？

对！但我们在Linux这边，所以更酷！

## ✨ 核心特性

- ⚡ **真正的内核集成** - 用一个Linux内核模块假装是Windows内核
- 🎨 **真·Scratch 式API设计** - 让Windows API调用像拖积木一样简单
- 🚀 **性能炸裂** - 时间复杂度达到真正的 **O(1)** ! (因为只有一堆print和往文件里写东西)
- 🔧 **完全开源** - 反正也没人能看懂代码
- 🐛 **运行“稳定”** - 稳定率 -100%，这是我们的 **核心** 竞争力

## 💎 技术栈

在各类编程语言百花齐放的时代，我们选择了两种 **图灵完备** 的、在世界上被广泛使用的两种语言：

- 🐱 **Scratch(TurboWarp)** - 主逻辑实现，主要用于产生Bug
- 🅿️ **PHP** - 世界上 **最好的** 编程语言（doge），主要用于产生Bug

## 🖊 编译

我们的编译技术仍然紧跟时代，使用了最新的 **真·交叉编译** 技术，将两种语言 **完美** 融合。

### 编译环境

任意可运行TurboWarp和PHP的环境。

### 编译所需软件

- 🐱 **TurboWarp** - 用于编译 Scratch 代码 [点击下载](https://desktop.turbowarp.org/)
- 🅿️ **PHP** - 用于编译 PHP 代码 [点击下载](https://www.php.net/downloads.php)

### 编译过程

1. 打开 PHP ，然后打开 TurboWarp ，分别打开对应的主程序文件（`php/main.php` 和 `scratch/main.sb3`）
2. 在TurboWarp中，添加同目录下的kernel.js作为扩展文件
3. 确保两个窗口至少有一点重叠的地方（真·交叉编译）
4. 然后，php运行，TurboWarp点击小绿棋。

### 编译过程（带图）

⚠多图警告，点击展开查看

<!-- 可折叠，点击展开查看 -->
<details>

<summary>编译过程（带图）</summary>

1. 打开TurboWarp，打开`scratch/main.sb3`文件。
2. 勾选“在非沙箱环境下运行”并点击“允许”。
![同意扩展](img/1.bmp)
3. 构建**真·交叉编译环境**，如图，确保两个窗口有重叠的地方。
![构建交叉编译环境](img/2.bmp) 
4. 在终端中运行如下命令：
``` bash
php ./php/main.php
```
5. 点击TurboWarp中的小绿棋。
6. 等待编译完成。

</details>

### 编译结果

编译完成后，你会得到一个 `./lsw` 文件，这就是我们的子系统。

请不要试着去运行它，否则会笑死你。

运行环境要求：拥有 `bash` 的Linux发行版。

运行：
``` bash
chmod +x ./lsw
sed -i 's/\r$//' ./lsw
./lsw
```

## 🐂 本 LSW 具有超级牛力！