//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuHuaTop: 0, // 菜单的滑块DOM信息
    menuChosed: 0, // 当前选择的哪个菜单
    datas: [  // 当前页所有原始数据
      {p: "en0", title: '语法', data: [], type: 0}, // { q, a }
      {p: "en1", title: '单词', data: [], type: 0}, 
      {p: "en2", title: '放洋屁', data: [], type: 1}, // {t, url}
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
    server.request("main/todo.do", { m: 'getStudy', p: this.data.datas[index].p }).then((res) => {
      if (res.data && res.data.status === "0") {
        const temp = [...this.data.datas];
        temp[index].data = res.data.data;
        if (temp[index].type === 0) {
          temp[index].dataf = res.data.data.map((item, index) => tools.format0(item, index))
        } else if (temp[index].type === 1) {
          let temp_i = 0;
          temp[index].dataf = res.data.data.map((item) => {
            if (item.charAt(0) !== 'T') { temp_i++ };
            return tools.format1(item, temp_i);
          })
        }
        wx.setStorage({ key: `zz-index${index}`, data: res.data.data }); // 将新的原始数据存入缓存
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
  }
})
