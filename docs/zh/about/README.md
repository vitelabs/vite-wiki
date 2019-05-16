---
title: 关于
sidebar: auto
---

# 简介

::: tip Vite Labs

Vite 项目正在开发，有关Vite的相关的技术文档均会放此处，若有什么建议，欢迎提PR。

有关文档内容的修正，请勿直接修改，可以另开分支修改，然后提PR。修改入口在每个页面左下角。

目前技术设计前期的文档请放到 `docs/zh/technology`文件夹下，`docs/zh/technology/README.md`为该栏目首页。

本项目使用[vuePress](https://vuepress.vuejs.org/zh/)，有关侧边栏的配置说明，请移步: [vuePress 侧边栏](https://vuepress.vuejs.org/zh/default-theme-config/#%E4%BE%A7%E8%BE%B9%E6%A0%8F)

:::

::: warning 注意
请确保你的 Node.js 版本 >= 9。
:::

## 运行指南

### 环境要求

* **Node**: <Badge vertical="middle" text=">= 9.xx"/>
* **Yarn**: <Badge vertical="middle" text=">= 1.3.xx"/>

### 安装 yarn

```
brew install yarn
```

有关yarn的其他安装说明，请移步： [yarn document](https://yarnpkg.com/en/docs/install#mac-stable)

### 安装依赖

在doc.vite.org项目路径下，执行以下代码：

```
yarn
```

### 开始写作

```
npm run dev
```

### 静态资源管理

详情请移步： [https://vuepress.vuejs.org/zh/guide/assets.html](https://vuepress.vuejs.org/zh/guide/assets.html)

例如：

```markdown
![dag-ledger](~/images/dag-ledger.png)
```

![dag-ledger](~/images/dag-ledger.png)

***静态资源命名规范***: `[markdown文件名]+[静态资源名称]`

例如：

```
![dag-ledger](~/images/vep4-ledger.png)
```

## Markdown 扩展

[https://v1.vuepress.vuejs.org/zh/guide/markdown.html](https://v1.vuepress.vuejs.org/zh/guide/markdown.html)

## 内置组件

### Badge 组件 <Badge text="Stable"/>

[https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#badge](https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#badge)

### Demo 组件 <Badge type="error" text="Experimental"/>

内置Demo组件，用于分Tab展示示例代码，并支持在线测试RPC接口。

* **用法**：

      :::demo
      ``` language tab:TabName
      // There is the code  
      ```  
      ``` language test:TestCaseName
      // There is the code
      ```
      
      // Test without testname
      ``` language test
      ```
      :::


* **Example**:


      :::demo
      ``` json tab: Tab1 名称
          {
            "test": 1
          }
      ```
      ``` json tab: Tab2 名称
          {
            "result": success
          }
      ```
      ``` json test
            {
              "test": 1
            }
      ```
      ``` json test: 这是test标题
            {
              "test": 1
            }
      ```
      :::
    
  ::: demo
  ``` json tab: Tab1 名称
      {
        "test": 1
      }
  ```
  ``` json tab: Tab2 名称
      {
        "result": success
      }
  ```
  ``` json test
        {
          "test": 1
        }
  ```
  ``` json test: 这是test标题
              {
                "test": 1
              }
  ```
  :::
  
  

### Tab 组件 <Badge text="stable"/>

内置Tab组件，支持分Tab展示不同内容，与Demo组件不同的地方是，Tab组件支持在Tab内展示任何Markdown内容（Demo组件只支持在Tab内显示代码）。

::: warn
若只是想分Tab显示不同的代码和内容，请使用该组件，若想使用**在线测试功能**，请使用Demo组件。
:::

```markdown
:::: tabs

::: tab title
  * __markdown content__
  * __markdown content__
  * __markdown content__
:::


::: tab javascript
    () => {
      console.log('Javascript code example')
    }
:::

::::
```

**Output**

:::: tabs

::: tab title
  * __markdown content__
  * __markdown content__
  * __markdown content__
:::


::: tab javascript
    () => {
      console.log('Javascript code example')
    }
:::

::::
  
### TeX Support <Badge text="stable"/>

在线**LaTeX**编辑器：[https://arachnoid.com/latex/](https://arachnoid.com/latex/)

#### 例子

```
Supposing that $y >= 0$ and that $[\log x]$ represents the integer part of $\log x$, let:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

Obviously, when $0 <= y <= 1$, there is $\Phi(y) = 0$. For all $y >= 0$, $\Phi(y)$ is a non-decreasing function.

When $\log x>=10^4$ and $y>= e^{2{(\log x)}^{-0.1}}$, thus:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$
```  

**Output**:

Supposing that $y >= 0$ and that $[\log x]$ represents the integer part of $\log x$, let:

$$\Phi (y) = \frac {1} {2 \pi i} \int_{2 - i \infty}^{2 + i \infty} \frac {y^{\omega} \mathrm{d} \omega} {\omega \left(1 + \frac {\omega} {(\log x)^{1.1}}\right)^{[ \log x ] + 1}}, x > 1$$

Obviously, when $0 <= y <= 1$, there is $\Phi(y) = 0$. For all $y >= 0$, $\Phi(y)$ is a non-decreasing function.

When $\log x>=10^4$ and $y>= e^{2{(\log x)}^{-0.1}}$, thus:

$$1 - x^{- 0.1} <= \Phi (y) <= 1$$

* **块级元素**

  ```markdown
  这是一个行内元素：$$x_1$$ 
  ```
  
  **Output**:
  
  这是一个 ***块级元素*** ：$$x_1$$ 
  
* **行内元素**

  ```markdown
  这是一个行内元素：$x_1$ 
  ```
  
  **Output**:
  
  这是一个 ***行内元素***：$x_1$ 
