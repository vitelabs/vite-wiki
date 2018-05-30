---
home: true
heroImage: /logo_black.svg
actionText: 了解Vite →
actionLink: /zh/introduction/
footer: Vite Labs Limited, All Rights Reserved | Copyright © 2018 VITE Labs
---

::: tip Vite Labs
Vite 项目正在开发，有关Vite的相关的技术文档均会放此处，若有什么建议，欢迎提PR。

有关文档内容的修正，请勿直接修改，可以另开分支修改，然后提PR。修改入口在每个页面左下角。

目前技术设计前期的文档请放到 `docs/zh/technology`文件夹下，`docs/zh/technology/README.md`为该栏目首页。

本项目使用[vuePress](https://vuepress.vuejs.org/zh/)，有关侧边栏的配置说明，请移步: [vuePress 侧边栏](https://vuepress.vuejs.org/zh/default-theme-config/#%E4%BE%A7%E8%BE%B9%E6%A0%8F)
:::

::: warning 注意
请确保你的 Node.js 版本 >= 9。
:::

## doc.vite.org 运行指南

### 环境要求

* node: >= 9.xx
* yarn: >= 1.3.xx

### 安装 yarn

```
brew install yarn
```

有关yarn的其他安装说明，请移步： [yarn document](https://yarnpkg.com/en/docs/install#mac-stable)

### 安装 vuepress

```
yarn global add vuepress # 或者：npm install -g vuepress
```

### 开始写作


```
vuepress dev docs # 必须在该项目目录下运行
```

### 在文档中如何添加静态资源，例如图片?

请移步： [https://vuepress.vuejs.org/zh/guide/assets.html](https://vuepress.vuejs.org/zh/guide/assets.html)


