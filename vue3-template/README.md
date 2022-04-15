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

## 代码规范

### Component

所有的 Component 文件都是以大写开头 (PascalCase)

- `/components/BackToTop/index.vue`
- `@/components/Charts/Line.vue`
- `@/views/example/components/Button.vue`

> 说明：目录下的 index.vue 需小写

### JS 文件

所有的.js 文件都遵循横线连接 (kebab-case)

- `@/utils/open-window.js`
- `@/components/MarkdownEditor/default-options.js`

### Views

在 views 下分组目录及页面路由命名以 - 分隔的小写命名（跟路由保持一致）。components 目录下的组件命名跟上面的 Component 保持一值，代表路由组件的 .vue 文件都是以大写开头 (PascalCase)。

> 说明：目录下的 index.vue 需小写

- `/views/dashbaord/index.vue`
- `@/views/home/index.vue`
- `@/views/user-list/index.vue`
- `@/views/user-list/Filter.vue` // 此处 Filter 是一个被其他页面引用的组件
- `@/views/error-page/401.vue`
- `@/views/error-page/404.vue`

## 相关项目

vue2+js 版本：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

vue2+ts 版本：[vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

See [Configuration Reference](https://cli.vuejs.org/config/).
