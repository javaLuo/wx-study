// components/shareImage/index.js
const config = require("../../config/index.js");
Component({
  /**
   * 组件的属性列表 props
   */
  properties: {
    userinfo: {
      type: Object,
      value: null,
    },
    open: {
      type: Boolean,
      value:false,
    },
    canShow:{ // 是否出现
      type: Boolean,
      value: false,
      observer: function(){
        this.setData({
          resShow: false,
        })
      }
    }
  },

  /**
   * 组件的初始数据 state
   */
  data: {
    resShow: false, // 生成图片后，展现图片
    shareImageSrc: "", // 生成的图片
  },
  ready() {

  },

  /**
   * 组件的方法列表 methods
   */
  methods: {
    // 生成图片并保存到本地
    onCreate: function(){
     if(this.data.open) {
       if (!this.properties.userinfo){
         wx.showToast({ title: '制作失败QAQ', icon: 'none'});
          return;
       }

       wx.showLoading({title: '制作中...'});
       // 下载所需图片 头像、背景
       this.downLoadImages([this.properties.userinfo.avatarUrl, `${config.baseUrl}/imgs/wx/share-image.png`]).then((res)=>{
        console.log("返回了什么：", res)
        const ctx = wx.createCanvasContext('share-image', this);

        ctx.drawImage(res[0].path, 42, 43, 82, 82/(res[0].width/res[0].height));
        ctx.drawImage(res[1].path, 0, 0, 300, 500);
        
        // ctx, str, color, fontSize, x, y, textAlign
        this.drawText(ctx, this.properties.userinfo.nickName, "#ffffff",25, 140, 68, 'left');
        this.drawText(ctx, 'hi, there', "#ffffff", 18, 50, 150, 'left');
        this.drawText(ctx, "我正在这里学习准备专升本", "#ffffff", 18, 50, 180, 'left');
        this.drawText(ctx, "你也一起来吧", "#ffffff", 18, 50, 210, 'left');
        this.drawText(ctx, '"你醒啦，作业做了吗"', "#ffffff", 18, 150, 310, 'center');
        ctx.draw();
        this.triggerEvent('openChange', false);
        wx.canvasToTempFilePath({
          x:0,
          y:0,
          width: 300,
          height: 500,
          canvasId: "share-image",
          success: (res)=>{
            this.setData({
              resShow: true,
              shareImageSrc: res.tempFilePath,
            });
          },
          complete:()=>{
            wx.hideLoading();
          }
        }, this);
       }).catch((e)=>{ // 下载图片出现错误
        wx.hideLoading();
       });
     } else {
       console.log("触发1111");
       this.triggerEvent('openChange', true)
     }
    },

// 把图片保存到相册
saveImage(){
  if(this.data.shareImageSrc){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImageSrc,
      success: () => {
        wx.showToast({ title: "已存入相册" });
      }
    })
  } else {
    wx.showToast({title: "保存失败", icon:"none"});
  }
},
    // 网络图片需要先下载到本地
    downLoadImages(urls){
      return Promise.all(urls.map((item)=>{
        return new Promise((res, rej)=>{
          wx.getImageInfo({
            src: item,
            success: (msg)=>{
              res(msg);
            },
            fail: (e) => {
              rej(e);
            }
          });
        })
      }))
    },

// 画文字
    drawText(ctx, str, color, fontSize, x, y, textAlign){
      ctx.setTextBaseline('top')
      ctx.setTextAlign(textAlign)
      ctx.setFillStyle(color)
      ctx.setFontSize(fontSize)
      ctx.fillText(str, x, y);
    },

    // 关闭图片展示
  closeShareBox() {
      this.setData({
        resShow: false,
      });
    }
  },
})
