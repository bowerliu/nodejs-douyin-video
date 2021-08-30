 
const puppeteer = require('puppeteer');
let browser;
(async () => {
  browser = await puppeteer.launch({ headless: true,
              //  slowMo: 150   
  });
})();
class DouYin {
	constructor(opt){
    this.userAgent = opt && opt.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
  }
  getVideo(url,callback){
        (async () => {
          if(!url){
           throw "url is empty"
          }
        if(!browser){
          browser = await puppeteer.launch();
        }
        const page = await  browser.newPage();
        page.setUserAgent(this.userAgent);
        const blockTypes = new Set(['image','media', 'font','stylesheet']);
        await page.setRequestInterception(true); //开启请求拦截
        page.on('request', request => {
            const type = request.resourceType();
            const shouldBlock = blockTypes.has(type);
            if(shouldBlock){
                return request.abort();
            }else{
                return request.continue({
                });
            }
        });
          try{
          await page.goto(url,{});
          await page.waitForSelector('video')
          await page.exposeFunction('nodelog',(src,title )=>{
            if(!src){
                page.evaluate(async () =>  {
                  console.log('ok')
                  //  let title = document.getElementsByTagName("html")[0].innerHTML;
                    let v =  document.getElementsByTagName("video");
                    console.log(v[0])
                    let src = 0
                    let title =''
                    if(v[0]){
                      src =  v[0].getAttributeNode("src").textContent;
                      title =  document.getElementsByTagName("h1")[0].textContent
                    }
                    const myHash = await window.nodelog(src,title);
                  });
            }else{
                callback({status:0, video_url:src,title:title})
            }

          }
          );
          await page.evaluate(async () =>  {
            let v =  document.getElementsByTagName("video");
            console.log(v[0])
            let src = 0
            let title =''
            if(v[0]){
              src =  v[0].getAttributeNode("src").textContent;
              title =  document.getElementsByTagName("h1")[0].textContent
            }
            const myHash = await window.nodelog(src,title);
          });
          await page.close();
        }catch(e){
          console.log(e)
          callback({status:1, video_url:"#",title:"网络错误!!"})
        }
        })();
  }
}

module.exports = DouYin