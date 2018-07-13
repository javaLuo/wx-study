//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuHuaTop: 0, // 菜单的滑块DOM信息
    menuChosed: 0, // 当前选择的哪个菜单
    datas: [  // 当前页所有原始数据
      {
        title: '英语复习', data: [
          {q:"啊，英语要怎么学啊？", a:"自己背单词吧"}
        ]
      },
    ]
  },
  onLoad: function () {
    
  },
  onShareAppMessage: function (res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习英语`,
      path: '/pages/english/index',
      imageUrl: "https://isluo.com/imgs/wx/wx-study-share.jpg",
    }
  },
  chosemenu: function (e) {
    if (e.currentTarget.dataset.index !== this.menuChosed) {
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop
      });
    }
  }
})
