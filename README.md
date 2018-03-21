# [vite.org](http://vite.org)

> Source code for vite.org.

## Start

### Env

* node: >= 9.xx
* yarn: >= 1.3.xx

```
git clone git@github.com:vitelabs/website.git

yarn
```

If the node-sass is not installed correctly, you can run `npm rebuild node-sass`.

### Cli

* `npm run dev`: run local dev server, you can see result by visit: `http://localhost:3000`
* `npm run build`: build production assets
* `npm run start`: start server
* `npm run generate`: generate static html
* `npm run p`: run `npm run build` and `npm run generate`

## i18n

You can edit lang translate data from [locales](https://github.com/vitelabs/website/tree/master/locales). The default language is : `en`.

Wiki also support multi languages, you can edit it at [content](https://github.com/vitelabs/website/tree/master/content)

## Wiki

### config.yaml

Each language wiki should have a `config.yaml`. This is for configure wiki sidebar menu.

Example:

```yaml
navs:
 -
   label: 测试
   path: /section
   navs:
   	- test3.md
 -
   label: 测试2
   path: /section2
   navs:
   	- test2.md
 - test.md
```

### edit

#### title

You can add title by this: 


```

---
title: This is title
---

This is content...


```

This `This is title` will be the label of sidebar menu. 
In the markdown, you can add subtitles by add `h2` title.

Example:

```markdown

---
title: This is title
---

## This is subtitle

this is content....

## This is subtitle2

```







