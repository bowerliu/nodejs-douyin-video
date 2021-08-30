const {DouYin}     = require('douyin-video-get')
const dy = new DouYin()
dy.getVideo("https://www.douyin.com/video/6974690128468004127?previous_page=main_page&tab_name=home",function(r){console.log(r)});