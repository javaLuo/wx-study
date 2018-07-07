//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuHuaTop: 0, // 菜单的滑块DOM信息
    menuChosed: 0, // 当前选择的哪个菜单
    datas: [  // 当前页所有原始数据
      {
        title: '语法', qs: [
          { q: 'aaaa', a: 'bbbb' },
          { q: 'aaaa', a: 'bbbb' },
          { q: 'aaaa', a: 'bbbb' },
        ]
      },
      {
        title: '短语', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '单词', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
    ]
  },
  onLoad: function () {
    
  },
  onShareAppMessage: function (res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习英语`,
      path: '/page/index/index',
      imageUrl: app.globalData.userInfo.avatarUrl,
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
