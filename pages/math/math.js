//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop:0,
    datas: [  // 当前页所有原始数据
      {
        title: '三角函数', qs: [
          { q: 'aaaa', a: 'bbbb' },
          { q: 'aaaa', a: 'bbbb' },
          { q: 'aaaa', a: 'bbbb' },
        ]
      },
      {
        title: '对数特性', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '求极限', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '导数', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      },
      {
        title: '微分111', qs: [
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
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习数学，起床，吃饭，学习，睡觉！`,
      path: '/page/index/index',
      imageUrl: app.globalData.userInfo.avatarUrl,
    }
  },
  chosemenu: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.index !== this.menuChosed) {
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop
      });
    }

  }
})
