# tree插件封装

## 例子
可以去仓库 example文件夹下查看例子完整代码

[查看例子-gitPage](https://mtt3366.github.io/js-tree-plugin/example/index.html)
## 博客说明原理
[插件组件封装系列：tree插件封装](https://juejin.cn/post/6988105930248290318/)
## 使用

引入：
```html
<script src="dist/tree.min.js"></script>
```
也支持commonjs和es6module规范

支持自定义配置：
options:
```js
element:[dom]
data:[array]
callback:[function->self/em/ul]
```
两种使用方式:
```js
new zTree([element],[options])
new zTree([options])
```
例如：
```js
new zTree(container1, {
   data
});
new zTree({
    element: container2,
    data,
    callback(self, em, ul) {
            console.log(self, em, ul);
    }
});
```

