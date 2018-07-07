/** 政治页 **/
const app = getApp(); // 全局实例
const server = require('../../utils/server.js'); // ajax
Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop: 0,
    test: 0,
    datas: [  // 当前页所有原始数据
      // { title: '哲学', qs:[
      //   { q: 'aaaa', a: 'bbbb' },
      //   { q: 'aaaa', a: 'bbbb' },
      //   { q: 'aaaa', a: 'bbbb' },
      // ]}
    ]
  },
  onLoad: function () {
    this.getData();
    this.setData({
      test: 100,
    });
  },
  onShow: function(){
    console.log("test:", this.data.test, this.data.datas);
    if(!this.data.datas.length){
      this.getData();
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习政治`,
      path: '/page/index/index',
      imageUrl: app.globalData.userInfo.avatarUrl,
    }
  },
  // 左侧菜单选择时触发
  chosemenu: function(e){
    console.log(e, app);
    if(e.currentTarget.dataset.index !== this.menuChosed){
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop
      });
    }
  },
  // 获取数据
  getData: function(){
    wx.showLoading({
      title: '努力加载...'
    });
    server.request("getData", {type: 'zz'}).then((res)=>{
      if(res.status === 200){
        this.setData({
          datas: res.data,
        })
      } else {
        wx.showToast({
          title: '获取数据失败，请重试',
          icon: "none"
        })
      }
    }).catch((e)=>{
      wx.showToast({
        title: '获取数据失败，请重试',
        icon:"none"
      })
    });
  }
})
