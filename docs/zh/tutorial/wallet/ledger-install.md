# Ledger Nano S 安装教程
目前 Ledger Nano S Vite App 的固件代码已经提交到官方审核，由于审核还没有通过，无法通过 Ledger Live App 直接下载，所以想要通过 Nano S 管理 Vite 链上资产的用户可以通过源码编译的方式进行安装，大约需要如下几个步骤：
1. 安装 VirtualBox 虚拟机
2. 在虚拟机中安装 ubuntu 操作系统
3. 下载源码配置编译环境
4. 编译安装

下面逐一讲解，请严格按照步骤执行。

## 安装 VirtualBox 虚拟机
进入[虚拟机下载页面](https://www.virtualbox.org/wiki/Downloads)，如下图所示，Windows 用户下载 Windows 版本，macOS 用户下载 macOS 版本。下载完成后根据提示进行安装。
![download-virtualbox](~/images/ledger/download-virtualbox.png)


## 在虚拟机中安装 ubuntu 操作系统
进入[ubuntu下载页面](https://ubuntu.com/#download)，点击下图所示按钮下载 ubuntu 系统镜像文件。

![download-ubuntu](~/images/ledger/download-ubuntu.png)

下载成功后，打开 VirtualBox，点击 New 新建虚拟机
![install-1](~/images/ledger/install-1.png)

Name 填入“ubuntu”，选择合适的位置存放虚拟机文件，使用默认位置即可。
注意，Type 必须为 Linux，Version 必须为 Ubuntu (64-bit) ，以保证和我们之前下载的系统镜像一致。
之后点击 Continue
![install-2](~/images/ledger/install-2.png)

设置内存大小为 2048 MB 或更高，点击 Continue
![install-3](~/images/ledger/install-3.png)

选择 Create a virtual hard disk now，点击 Create
![install-4](~/images/ledger/install-4.png)

选择 VDI (VirtualBox Disk Image)，点击 Continue
![install-5](~/images/ledger/install-5.png)

选择 Dynamically allocated，点击 Continue
![install-6](~/images/ledger/install-6.png)

选择新建的硬盘要存放的位置，使用默认位置即可，硬盘大小使用推荐的大小，此处为 10.00 GB，点击 Create
![install-7](~/images/ledger/install-7.png)

现在虚拟机创建好了，接下来添加系统镜像，点击 Settings
![install-8](~/images/ledger/install-8.png)

点击 Storage，选中 Controller: IDE 下的 Empty 这一行，点击右侧箭头所指的光盘图标
![install-9](~/images/ledger/install-9.png)

选择 Choose/Create a Virtual Optical Disk... 选项
![install-10](~/images/ledger/install-10.png)

点击 Add 添加镜像文件
![install-11](~/images/ledger/install-11.png)

选择之前下载好的 ubuntu-20.04-desktop-amd64.iso 镜像文件，点击打开
![install-12](~/images/ledger/install-12.png)

选中添加进来的镜像文件，点击 Choose
![install-13](~/images/ledger/install-13.png)

如下图所示，此时镜像文件已经添加进来了，之后点击 Ok，保存设置
![install-14](~/images/ledger/install-14.png)

点击 Start 启动虚拟机
![install-15](~/images/ledger/install-15.png)

等加载完成后会出现 ubuntu 的安装界面，默认选择 English 就行，如下图所示，点击 Install Ubuntu
![install-16](~/images/ledger/install-16.png)

点击 Continue
![install-17](~/images/ledger/install-17.png)

选择 Minimal installation，取消勾选 Download updates while installing Ubuntu，之后点击 Continue
![install-18](~/images/ledger/install-18.png)

选择 Erase disk and instll Ubuntu，之后点击 Install Now
![install-19](~/images/ledger/install-19.png)

点击 Continue
![install-20](~/images/ledger/install-20.png)

选择你所在的地区，之后点击 Continue
![install-21](~/images/ledger/install-21.png)

输入用户名和密码，密码请牢记，选择 Log in automatically，之后点击 Continue
![install-22](~/images/ledger/install-22.png)

之后系统就会开始安装，时间稍长请耐心等待，安装完成后会弹出如下提示，点击 Restart Now，重启系统，安装完成
![install-23](~/images/ledger/install-23.png)

## 下载源码配置编译环境

## 编译安装