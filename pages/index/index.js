//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    datas: [  // 当前页所有原始数据
      { title: '哲学', qs:[
        { q: 'aaaa', a: 'bbbb' },
        { q: 'aaaa', a: 'bbbb' },
        { q: 'aaaa', a: 'bbbb' },
      ]},
      {
        title: '毛中特', qs: [
          { q: 'a1aaa', a: 'bbbb' },
          { q: 'aa2aa', a: 'bbbb' },
          { q: 'aa3aa', a: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb23bb' },
        ]
      }
    ]
  },
  onLoad: function () {
    
  },
  chosemenu: function(e){
    console.log(e);
    if(e.currentTarget.dataset.index !== this.menuChosed){
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
      });
    }
    
  }
})
