/** 政治页 **/
const app = getApp(); // 全局实例
const tools = require("../../utils/util.js");
const server = require('../../utils/server.js'); // ajax

let scrollTimer = null; // 滚动计时器
let continueTimer = null; // 看到哪里了 倒计时
Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop: 0,
    aOpen: false, // 是否高亮答案
    continueShow: false, // 是否显示continue
    continueTime: 5, // 倒计时
    continueNum: 0, // 看到100%多少了
    datas: [  // 当前页所有原始数据
    // title:标题，data:原始数据,type:0知识点/1选择题，dataf:构建后的对象，p:相当于id， t:当前滚动的高度,tt:同步高度时设置, c:是否显示提示
      { title: '知识点', data:[], type: 0, dataf: [], p:'zz1', t: 0, tt:0, h: 0}, // type=0;知识点，1选择题
      { title: '毛中特一', data: [], type: 1, dataf: [], p: 'zz2', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '毛中特二', data: [], type: 1, dataf: [], p: 'zz3', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '哲学练习', data: [], type: 1, dataf: [], p: 'zz4', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '哲学单选', data: [], type: 1, dataf: [], p: 'zz5', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '模拟卷一', data: [], type: 1, dataf: [], p: 'zz6', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '模拟卷二', data: [], type: 1, dataf: [], p: 'zz7', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
      { title: '模拟卷三', data: [], type: 1, dataf: [], p: 'zz8', t: 0, tt: 0, h: 0}, // type=0;知识点，1选择题
    ]
  },
  /** 加载完毕 **/
  onLoad: function(){
    const the = [...this.data.datas];
    the.forEach((item)=>{
      const top = wx.getStorageSync(`top-${item.p}`);
      const height = wx.getStorageSync(`height-${item.p}`);
      if(top){
        item.t = top;
      }
      if(height){
        item.h = height;
      }
    });
    this.setData({
      datas: the,
    });
  },
  /** 加载完毕并且渲染完毕 **/
  onReady: function () {
    console.log("AAAAAAAA");
    this.setData({
      test: 100,
      aOpen: !!wx.getStorageSync("aOpen")
    });
    this.showContinue();
  },
  /** 页面每次出现 **/
  onShow: function(){
    console.log("BBBBBBBBB");
    if(!this.data.datas[this.data.menuChosed].data.length){
      this.getData(this.data.menuChosed);
    }
  },
  /** 页面每次隐藏 **/
  onHide: function(){
    clearInterval(continueTimer);
  },

  /** 页面分享时 **/
  onShareAppMessage: function(res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习政治`,
      path: '/pages/index/index',
      imageUrl: "https://isluo.com/imgs/wx/wx-study-share.jpg",
    }
  },
  // 滚动时触发，记录当前这个分类滚动到多高了
  onScroll: function(e) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(()=>{
      console.log(e);
      const the = this.data.datas.find((item) => item.p === e.target.id);
      wx.setStorage({key: `top-${the.p}`, data: e.detail.scrollTop});
      wx.setStorage({key: `height-${the.p}`, data: e.detail.scrollHeight });
    }, 100);
  },
  // 高亮答案改变
  aOpenSwitchChange(e){
    console.log(e);
    this.setData({
      aOpen: e.detail.value,
    });
    wx.setStorageSync("aOpen", e.detail.value);
  },
  // 左侧菜单选择时触发
  chosemenu: function(e){
    console.log(e, app);
    if(e.currentTarget.dataset.index !== this.menuChosed){
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop
      });
      if (!this.data.datas[e.currentTarget.dataset.index].data.length){
        this.getData(e.currentTarget.dataset.index);
      }
      this.hideContinue();
      this.showContinue();
    }
  },
  // 点击某一个题目时
  onScrollTap(e){
    console.log("点击触发：", e);
  },
  // 看到哪了 出现
  showContinue: function(){
    
    const the = this.data.datas[this.data.menuChosed];
    wx.createSelectorQuery().select(`#${the.p}`).scrollOffset((res)=>{
      console.log("获取：", res, the);
      if (Math.abs(the.t - res.scrollTop) > 200 && the.h) { // 如果为true就出现
        const data_temp = [...this.data.datas];
        data_temp[this.data.menuChosed].c = false;
        this.setData({
          continueShow: true,
          continueNum: (the.t/the.h * 100).toFixed(0),
          datas: data_temp,
        });
        clearInterval(continueTimer);
        this.setData({
          continueTime: 8,
        })
        continueTimer = setInterval(() => {
          if (this.data.continueTime <= 1) {
            this.hideContinue();
          }
          this.setData({
            continueTime: --this.data.continueTime,
          })
        }, 1000);
      }
    }).exec();
  },
  // 看到哪了 隐藏
  hideContinue: function(){
    this.setData({
      continueShow: false,
      continueTime: 5,
    })
    console.log("ClearInterval????");
    clearInterval(continueTimer);
  },

  // 用户点击了看到哪了框
  onContinueTap: function(e){
    const the = this.data.datas[this.data.menuChosed];
    the.tt = the.t;
    this.setData({
      datas: this.data.datas,
    });
    this.hideContinue();
  },

  // 获取数据
  getData: function(index){
    // 先看缓存有没有，有就取缓存
    const haveCache = this.getDataFromCache(index);
    if(!haveCache){ // 说明没有cache
      wx.showLoading({ // 没有cache就显示加载中，准备请求接口。
        title: '加载中...'
      });
    }

    // 请求新的数据，即便有cache也会请求
    server.request("main/todo.do", { m: 'getStudy', p: this.data.datas[index].p}).then((res)=>{
      if(res.data && res.data.status === "0"){
        const temp = [...this.data.datas];
        temp[index].data = res.data.data;
        if(temp[index].type === 0) {
          temp[index].dataf = res.data.data.map((item, index) => tools.format0(item, index))
        } else if(temp[index].type === 1){
          let temp_i = 0;
          temp[index].dataf = res.data.data.map((item) => {
            if(item.charAt(0) !== 'T'){temp_i++};
            return tools.format1(item, temp_i);
          })
        }
        wx.setStorage({key: `zz-index${index}`, data: res.data.data}); // 将新的原始数据存入缓存
        if(!haveCache){ // 如果没有缓存，就重新设置，否则就只是把新数据存入缓存，下次打开小程序时就是最新的了
          this.setData({
            datas: temp,
          });
          wx.hideLoading();
        }
      } else {
        if(!haveCache){
          wx.showToast({
            title: '获取数据失败，请重试',
            icon: "none"
          })
        }
      }
    }).catch((e)=>{
      wx.showToast({
        title: '网络错误，将尝试从缓存获取数据',
        icon:"none"
      })
    });
  },
  // 从缓存获取原始数据
  getDataFromCache(index){
    const data = wx.getStorageSync(`zz-index${index}`);
    if(data){
      wx.showLoading({
        title: '正在构建...',
      })
      const temp = [...this.data.datas];
      temp[index].data = data;
      if (temp[index].type === 0) {
        temp[index].dataf = data.map((item, index) => tools.format0(item, index))
      } else if (temp[index].type === 1) {
        let temp_i = 0;
        temp[index].dataf = data.map((item) => {
          if (item.charAt(0) !== 'T') { temp_i++ };
          return tools.format1(item, temp_i);
        })
      }
      this.setData({
        datas: temp,
      });
      wx.hideLoading();
      return true;
    }
    return false;
  }
})
