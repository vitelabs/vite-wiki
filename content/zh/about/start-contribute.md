---
title: "文档编写"
discription: "如何编写vite labs的文档"
---

# 如何编写文档

## 文档源码

该网站的源码位于：[vitelabs/doc.vite.org](https://github.com/vitelabs/doc.vite.org)。

文档markdown地址：https://github.com/vitelabs/doc.vite.org/tree/master/content

## 文档栏目

目前文档分为四栏：

* 白皮书: 该栏目用于存放白皮书相关文档。地址：[whitePaper](https://github.com/vitelabs/doc.vite.org/tree/master/content/zh/whitePaper)
* 技术细节: 用于存放深挖技术细节的文章，类似博客或者教程。地址：地址：[tech](https://github.com/vitelabs/doc.vite.org/tree/master/content/zh/tech)
* faq: 常见问题答疑。地址：[faq](https://github.com/vitelabs/doc.vite.org/tree/master/content/zh/faq)
* about: 文档编辑、翻译、代码贡献相关文档。地址：[about](https://github.com/vitelabs/doc.vite.org/tree/master/content/zh/about)

## 右侧导航栏配置

> 每一栏木有一个导航栏，每一个栏目下的markdown文件名称不应该重复

默认导航栏以文档创建日期来排序，默认是没有文档聚合功能。

若要支持单独的导航栏配置，需要在每个栏目下添加: `config.yaml`文件

例如：

```yaml
navs:
 -
   label: 技术细节
   navs:
   	- snapshot.md
```

`label`为聚合的文档名称，例如若想把多个markdown（snapshot.md、about.md、test.md）文件归为一类，可以这样：

```yaml
navs:
 -
   label: 技术细节
   navs:
   	- snapshot.md
   	- about.md
   	- test.md
```

## 如何自定义每篇文档在导航栏显示的文字？

每个文档在开头支持配置title和description

```markdown

---
title: "这是在导航栏显示的title"
description: "这是用于生成文档时添加到html meta标签里的description字段，用于优化seo"
---

```

## 我需要在本地跑起来这个项目才能编辑么？

项目跑起来是为了预览，由于文档都是markdown，很多编辑器都支持预览，除了不支持数学表达式以外，其他的都支持。

若只是编辑文档，无需在本地跑该项目。

当代码提交到master分支后，会自动build并发布该网站。

## 如何支持数学公式？

文档支持数学公式的显示，采用Mathjax工具。

可以在[latex在线编辑器](http://latex.codecogs.com/eqneditor/editor.php)编辑生成代码。

例如: 如何表达 a/b

在[latex在线编辑器](http://latex.codecogs.com/eqneditor/editor.php)生成以下代码：

```markdown
\frac{a}{b}
```

填写到markdown文本里时，开始和结束都加上 `$$`，例如：

```markdown
$$\frac{a}{b}$$
```
会显示成：$$\frac{a}{b}$$

也支持块级展示：

```markdown
$$
\frac{a}{b}
$$
```

复杂公式：

```markdown
$$
Q_{tps} = T \cdot \left ( \frac{2}{1+exp\left ( -P_{d}\cdot D - P_{s}\cdot S - P_{b}\cdot B \right )} - 1  \right )
$$
```

$$
Q_{tps} = T \cdot \left ( \frac{2}{1+exp\left ( -P_{d}\cdot D - P_{s}\cdot S - P_{b}\cdot B \right )} - 1  \right )
$$

## 如何展示静态资源？

### 方法一：存放到本项目里

静态资源可以放到 `static`目录下，然后引用时通过`/your-static-path`地址来访问。

例如：需要引用图片 `bg.jpg`，将文件放到 `static`目录下

```markdown
![bg.jpg](/bg.jpg)
```
展示效果如下：

![bg.jpg](/bg.jpg)

### 方法二：上传到其他图片服务器上

例如：可以在[cnode 发帖栏目](https://cnodejs.org/topic/create)里上传图片，然后复制上传之后的url到这里。

```markdown
![diqiu-008.jpg](//dn-cnode.qbox.me/Fhpq63ktXpJ3LJxMB21L9WazxbKi)
```

显示为：

![diqiu-008.jpg](//dn-cnode.qbox.me/Fhpq63ktXpJ3LJxMB21L9WazxbKi)
