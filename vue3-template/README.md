# vue3-template

## 简介

项目基于 [vue3-composition-admin](https://github.com/RainManGO/vue3-composition-admin)（[在线演示](https://admin-tmpl-test.rencaiyoujia.cn/)） 改造，保留 layout 框架布局及基础功能，移除其他不相关页面，提供最小集模板。

想了解更多关于 template 的技术细节可参考 [vue-element-admin-admin 官网文档](https://panjiachen.github.io/vue-element-admin-site/zh/)。

## 功能列表

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Customize configuration

## 命名规范

### Component

所有的 Component 文件都是以大写开头 (PascalCase)

- `/components/BackToTop/index.vue`
- `@/components/Charts/Line.vue`
- `@/views/example/components/Button.vue`

> 说明：目录下的 index.vue 除外，需小写

### JS 文件

所有的.js 文件都遵循横线连接 (kebab-case)

- `@/utils/open-window.js`
- `@/components/MarkdownEditor/default-options.js`

### Views

在 views 文件夹下，代表路由的 `.vue` 文件命名都以横线连接的小写命名(kebab-case)。代表路由的文件夹也是使用同样的规则。此处需要特殊说明的是，`views/**/components` 目录下的组件命名跟上面的 Component 保持一值，要跟页面路由区分开。

> 说明：目录下的 index.vue 需小写

- `/views/dashbaord/index.vue`
- `@/views/home/index.vue`
- `@/views/user-list/index.vue`
- `@/views/user-list/components/Filter.vue` // 此处 Filter 是组件，而非路由文件
- `@/views/error-page/401.vue`
- `@/views/error-page/404.vue`

使用横线连接 (kebab-case)来命名 `views` 主要是出于以下几个考虑：

- `views` 下的 `.vue` 文件代表的是一个路由，所以需要和 `component` 进行区分；
- 页面的 `url` 也是横线连接的，`views ` 中的路由文件命名要和其保持一值；

## 编码规范

1. 为组件设置样式作用域，除了定级 `App` 组件和布局组件的样式可以是全局的，但是其它所有组件都应该是有作用域的。单文件组件中可以使用 `scoped` 属性或者 `CSS Modules`。

了解更多，可参考[Vue.js 风格指南](https://cn.vuejs.org/v2/style-guide/index.html)

## 相关项目

vue2+js 版本：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

vue2+ts 版本：[vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

See [Configuration Reference](https://cli.vuejs.org/config/).
