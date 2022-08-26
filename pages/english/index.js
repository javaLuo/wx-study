//index.js
//获取应用实例
const app = getApp(); // 全局实例
const tools = require("../../utils/util.js");
const server = require('../../utils/server.js'); // ajax

Page({
  data: {
    app,
    menuHuaTop: 0, // 菜单的滑块DOM信息
    menuChosed: 0, // 当前选择的哪个菜单
    datas: [  // 当前页所有原始数据
      {p: "en0.json", title: '语法', data: [], type: 0}, // { q, a }换行
      {p: "en1.json", title: '高一单词', data: [], type: 1}, // q/a不换行
      { p: "en2.json", title: '高二单词', data: [], type: 1 }, // q/a不换行
      { p: "en3.json", title: '高三单词', data: [], type: 1 }, // q/a不换行
    ]
  },


onShow: function(){
  if (!this.data.datas[this.data.menuChosed].data.length) {
    this.getData(this.data.menuChosed);
  }
},

onShareAppMessage(){
  return {
    title: '专升本复习',
    path: '/pages/english',
  }
},

onShareTimeline(){
  return {
    title: '专升本复习',
  }
},

  chosemenu: function (e) {
    if (e.currentTarget.dataset.index !== this.menuChosed) {
      const d = this.data.datas[e.currentTarget.dataset.index];
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop
      });
      if (!d.data.length) {
        this.getData(e.currentTarget.dataset.index); // 没数据就先获取数据
      } 
    }
  },
  // 获取数据
  getData: function(index){
    // 先看缓存有没有，有就取缓存
    const haveCache = this.getDataFromCache(index);
    if (!haveCache) { // 说明没有cache
      wx.showLoading({ // 没有cache就显示加载中，准备请求接口。
        title: '加载中...'
      });
    }

    // 请求新的数据，即便有cache也会请求
    server.request('imgs/wx/' + this.data.datas[index].p).then((res) => {
      if (res.data && res.statusCode === 200) {
        const temp = [...this.data.datas];
        temp[index].data = res.data;
        wx.setStorage({ key: `en-index${index}`, data: res.data }); // 将新的原始数据存入缓存
        if (!haveCache) { // 如果没有缓存，就重新设置，否则就只是把新数据存入缓存，下次打开小程序时就是最新的了
          this.setData({
            datas: temp,
          });
          wx.hideLoading();
        }
      } else {
        if (!haveCache) {
          wx.showToast({
            title: '获取数据失败，请重试',
            icon: "none"
          })
        }
      }
    }).catch((e) => {
      wx.showToast({
        title: '网络错误，将尝试从缓存获取数据',
        icon: "none"
      })
    });
  },

  getDataFromCache(index){
    const data = wx.getStorageSync(`en-index${index}`);
    if (data) {
      wx.showLoading({
        title: '正在构建...',
      })
      const temp = [...this.data.datas];
      temp[index].data = data;
      this.setData({
        datas: temp,
      });
      wx.hideLoading();
      return true;
    }
    return false;
  },
})
