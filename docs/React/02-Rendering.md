---
last_update:
  date: 6 NOV 2023 GMT
  author: Casta-mere
---

# Rendering

高性能的虚拟 DOM 渲染

> **DOM element** _( Document Object Model )_
>
> 文档对象模型（DOM）是一个网络文档的编程接口。它代表页面，以便程序可以改变文档的结构、风格和内容。DOM 将文档表示为节点和对象；这样，编程语言就可以与页面交互。

<!-- ## Rendering Lists -->
## 列表渲染
列表渲染，即对于很多结构上重复的内容，可以通过循环的方式来渲染每一个元素

```jsx showLineNumbers
state = {
  tags: ["tag1", "tag2", "tag3"],
};
```

对于以上的列表，可以使用 `map` 函数来进行简单的列表渲染，代码如下。其中要求 **key** 的值必须唯一
```jsx showLineNumbers
// map函数用法
// map((pram1,pram2)=> <li key={pram1}>{pram2}</li>)

<ul>
  {this.state.tags.map((tag) => (
    <li key={tag}>{tag}</li>
  ))}
</ul>
```

<!-- ## Conditional Rendering -->
## 条件渲染
根据状态不同，去修改某个元素的状态(比如切换颜色)

```jsx showLineNumbers
// 通过判断state.count的值来切换其显示对应的类
getClassName() {
  let classes = "badge badge-pill m-2 badge-";
  classes += this.state.count === 0 ? "info" : "warning";
  return classes;
}

// 可以在render中直接这样调用
<span className={this.getClassName()}></span>
```

## Handling Events

## 状态更新与重新渲染

更新 state 并重新渲染界面

想象中的逻辑如下所示，直接 this.state+=1
```jsx showLineNumbers
increment(){
  this.state.count+=1;
}
```

然后在button中直接像这样绑定过去
```html showLineNumbers
<button onClick={this.increment}>test</button>
```

但是这里会出现两个问题

首先是 **this** 指针的问题。在React中，如果直接调用 `ans = function()` ，那么在function中的 this 指针是可以正常指向当前对象的。但是在这里我们传入的是函数本身 `onClick = increment`，会丢失掉 this 绑定对象的信息。

```bash showLineNumbers
func = increment   # 直接引用函数，函数体内不可以直接用this指针
ans  = increment() # 调用函数，函数体内可以直接用this指针
```

其次，这种方式**并不会重新渲染页面**。也就是说，如果 this.state.count 是要显示在界面上的，就算点击了 这个 increment 的 button , 前端显示也不会改变

:::note

this.state.count 是可以正常+1的，如果不需要这个数字展示给用户，就无所谓了

:::

接着来分别解决这两个问题

### this 指针问题

解决办法有两个。其一为重写 constructor ，在实例化对象前，进行**显式绑定**

```jsx showLineNumbers
// 构造函数中显式绑定
constructor() {
  super();
  this.increment = this.increment.bind(this);
}

increment(){
  this.count+=1;
};
```

第二种方式是使用箭头函数，它具有更简洁的语法结构，并且会自动绑定执行上下文

```jsx showLineNumbers
// 箭头函数
increment = () => {
  this.state.count+=1;
};
```

笔者这里更推荐后者，这样更简便，但是过多的箭头函数可能会降低代码可读性，请酌情选择。无论选择哪种，都可以解决我们的问题，都可以直接使用`onClick = {this.increment}`绑定

### 重新渲染问题

React 为我们写好了 `setState` 接口，对于需要在修改后重新渲染的变量，我们可以直接使用 `this.setState()` 来更新数据。其参数为字典型，只需要为 this.state 的子集即可，也就是说可以只修改部分变量

```jsx showLineNumbers
increment(){
  this.setState({ count: this.state.count + 1 });
}
```

### 最终解决办法

综上所述，如下的代码则是最终解决方法。完美解决了 this 指针和重新渲染的问题

```jsx showLineNumbers
increment = () => {
  this.setState({ count: this.state.count + 1 });
};
```