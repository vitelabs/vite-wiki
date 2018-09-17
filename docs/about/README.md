---
title: About
sidebar: auto
---
# Introduction

::: tip Vite project is being developed, relevant technical documents related to Vite will be put here, if any suggestions, welcome to mention PR.

有关文档内容的修正，请勿直接修改，可以另开分支修改，然后提PR。修改入口在每个页面左下角。

At present, the pre-technical design documents please put in `docs/zh/technology` folder, `docs/zh/technology/readme.md` is the first page of the column.

本项目使用[vuePress](https://vuepress.vuejs.org/zh/)，有关侧边栏的配置说明，请移步: [vuePress 侧边栏](https://vuepress.vuejs.org/zh/default-theme-config/#%E4%BE%A7%E8%BE%B9%E6%A0%8F) :::

::: warning 注意 请确保你的 Node.js 版本 >= 9。 :::

## Operation Guide

### Environmental requirements

* node: >= 9.xx
* yarn: >= 1.3.xx

### Installing yarn

    brew install yarn
    

有关yarn的其他安装说明，请移步： [yarn document](https://yarnpkg.com/en/docs/install#mac-stable)

### 安装依赖

在doc.vite.org项目路径下，执行以下代码：

    yarn
    

### 开始写作

    npm run dev
    

### 静态资源管理

详情请移步： <https://vuepress.vuejs.org/zh/guide/assets.html>

例如：

```markdown
![dag-ledger](~/images/dag-ledger.png)
```

![dag-ledger](~/images/dag-ledger.png)

## 内置组件

### Demo 组件

内置Demo组件，用于分Tab展示示例代码。

* **用法**：
    
    :::demo 
    
        language tab:TabName
          // There is the code
    
      
    
    
        language test:TestCaseName
          // There is the code
    
    // Test without testname ```language test``` :::

* **Example**:
    
    :::demo 
    
        json tab: Tab1 名称
              {
                "test": 1
              }
    
        json tab: Tab2 名称
              {
                "result": success
              }
    
        json test
                {
                  "test": 1
                }
    
        json test: 这是test标题
                {
                  "test": 1
                } :::
    
    ::: demo ``` json tab: Tab1 名称 { "test": 1 }
    
        ``` json tab: Tab2 名称
          {
            "result": success
          }
        
    
    ``` json test { "test": 1 }
    
        ``` json test: 这是test标题
                  {
                    "test": 1
                  }
        
    
    :::