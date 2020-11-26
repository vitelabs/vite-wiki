# 交易机器人

## 交易所 API

为方便用户和做市商使用ViteX交易所，ViteX 支持和币安等中心化交易所相同的API接口。如果想使用自动交易机器人，请先开通ViteX API。相关详细介绍：[ViteX API](https://vite.wiki/zh/dex/api/dex-apis.html#vitex-api)

### 如何开通 API 功能

**第一步：登录 [x.vite.net](https://x.vite.net/)**

:::warning Warning
请确保登录的地址Vite 余额大于1000
:::

**第二步：进入 API 管理页面，点击创建 API**

![](https://media.discordapp.net/attachments/425845491478298624/766616321773010984/unknown.png?width=2340&height=1317)

**第三步：创建API创建成功后，请保存 `Access Key` 和 `Secret Key`。**

![](https://media.discordapp.net/attachments/425845491478298624/766616793116442624/unknown.png?width=2346&height=1317)

**第四步：管理 API 可交易的权限**

::: warning
请勿为API开通所有交易对的交易权限，仅开通 **自己需要的交易的交易对权限**。
:::

![](https://media.discordapp.net/attachments/425845491478298624/766617133622755338/unknown.png?width=2358&height=1316)

**第五步：为代理抵押地址抵押Vite**

![](https://media.discordapp.net/attachments/425845491478298624/766617502028791848/unknown.png?width=2352&height=1315)


:::tip
如何使用 ViteX API：[ViteX API](https://vite.wiki/zh/dex/api/dex-apis.html#vitex-api)
:::


## 如何使用 Humming Bot

ViteX 已接入 Humming Bot，用户可搭建属于自己的挂单挖矿机器人。

:::tip
请确保已经开通 ViteX API 功能，Humming Bot 依赖 ViteX API。
:::

### Ubuntu 安装 Humming Bot

#### 安装 Docker

```bash
# 1) Download Docker install script
wget https://raw.githubusercontent.com/CoinAlpha/hummingbot/development/installation/install-docker/install-docker-ubuntu.sh

# 2) Enable script permissions
chmod a+x install-docker-ubuntu.sh

# 3) Run installation
./install-docker-ubuntu.sh
```

#### 安装 Humming Bot

```bash
# 1) Download Hummingbot install, start, and update script
wget https://gist.githubusercontent.com/soliury/c69e352767b2521ceac83ba6775bd50f/raw/871c260483974179a97087a4146dca0c2197dc60/create.sh
wget https://gist.githubusercontent.com/soliury/43c0e649b87c7f39550aeb1f3432a835/raw/3ad918df93318d56e9f70e0647b17c87bd32fe0d/start.sh
wget https://gist.githubusercontent.com/soliury/f0f80ff3bb6b785e169a7cf7b82f4c4e/raw/2d0e1764399ebccad997d870f9c418979f329ddb/update.sh

# 2) Enable script permissions
chmod a+x *.sh

# 3) Create a hummingbot instance
./create.sh
```

#### 启动 Humming Bot

```bash
./start.sh
```

完成之后你会看到以下界面：

![](https://docs.hummingbot.io/assets/img/hummingbot-cli.png)

#### 设置 Humming Bot

请按照[hummingbot 官方文档](https://docs.hummingbot.io/operation/client/)的设置教程来配置 Humming Bot。

期间需要输入：`Access Key`，`Secret Key` 和 `委托地址`。


