---
last_update:
  date: 6 NOV 2023 GMT
  author: Casta-mere
---

# 初识 React

组件化、声明式、高效性的 JavaScript 库

[Mosh 教程]

## 环境配置

### n

[n] 是用来管理多个版本的 Node.js 的，类似于 Anaconda 之于 Python ，而且它的指令相对简单，易上手，使用以下命令来安装

```bash showLineNumbers
sudo npm install -g n
```

安装好后可以通过以下命令来安装不同的 Node 版本

```bash showLineNumbers
# 安装最新版本的 Node.js
sudo n install latest
# 安装制定版本的 Node.js
sudo n install 18
```

### bootstrap

```bash showLineNumbers
npm i bootstrap
```

## 快捷键

:::tip

vscode

删除整行 : `shift`+`ctrl`+`k`

快速添加光标 : 选中字段后 `ctrl`+`d`

jsx

Create Class : `cc`

:::

## Js 语法

```js showLineNumbers
const obj = { count: 5 };
const { count } = obj;
// 从字典 obj 中结构出 count
```

[n]:https://github.com/tj/n
[Mosh 教程]:https://www.youtube.com/watch?v=Ke90Tje7VS0