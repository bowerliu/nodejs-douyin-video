# douyin-video-get
 
# douyin-video-get 是什么?

抖音视频无水印下载

可以得到抖音视频下载地址

如有问题 欢迎反馈 bower.liu@gmail.com
 

# 如何使用
## 安装引用

可以直接下载源码后直接引用也可以npm安装

执行命令：`npm install douyin-video-get`
 
## 简单来个例子 
抖音分享地址或web页面
```javascript
const {DouYin}     = require('douyin-video-get')
const dy = new DouYin()
dy.getVideo("https://www.douyin.com/video/6974690128468004127?previous_page=main_page&tab_name=home",
    function(r){
        console.log(r)
    });

```
 
 