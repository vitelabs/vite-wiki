---
title: 關於
sidebar: auto
---

# 簡介

::: tip Vite Labs 
Vite 項目正在開發，有關Vite的相關的技術文檔均會放此處，若有什麼建議，歡迎提PR。

有關文檔內容的修正，請勿直接修改，可以另開分支修改，然後提PR。修改入口在每個頁面左下角。

目前技術設計前期的文檔請放到`docs/zh/technology`文件夾下， `docs/zh/technology/README.md`為該欄目首頁。

本項目使用[vuePress](https://vuepress.vuejs.org/zh/) ，有關側邊欄的配置說明，請移步: [vuePress側邊欄](https://vuepress.vuejs.org/zh/default-theme-config/#%E4%BE%A7%E8%BE%B9%E6%A0%8F) 
:::

::: warning 注意
请确保你的 Node.js 版本 >= 9。
:::

## 運行指南

### 環境要求

- node: >= 9.xx
- yarn: >= 1.3.xx

### 安裝yarn

```
brew install yarn
```

有關yarn的其他安裝說明，請移步： [yarn document](https://yarnpkg.com/en/docs/install#mac-stable)

### 安裝依賴

在doc.vite.org項目路徑下，執行以下代碼：

```
yarn
```

### 開始寫作

```
npm run dev
```

### 靜態資源管理

詳情請移步： [https://vuepress.vuejs.org/zh/guide/assets.html](https://vuepress.vuejs.org/zh/guide/assets.html)

例如：

```markdown
![dag-ledger](~/images/dag-ledger.png)
```

![dag-ledger](../../zh/about/~/images/dag-ledger.png)

## 內置組件

### Demo 組件

內置Demo組件，用於分Tab展示示例代碼。

- **用法** ：

    ```
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
    ```

- **Example** :

    ```
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
    ```

    ::: demo

    ```json
        {
          "test": 1
        }
    ```

    ```json
        {
          "result": success
        }
    ```

    ```json
          {
            "test": 1
          }
    ```

    ```json
                {
                  "test": 1
                }
    ```

    :::
