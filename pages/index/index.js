/** 政治页 **/
const app = getApp(); // 全局实例
const tools = require("../../utils/util.js");
const server = require('../../utils/server.js'); // ajax
Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop: 0,
    aOpen: false, // 是否高亮答案
    datas: [  // 当前页所有原始数据
      { title: '知识点', data:[], type: 0, dataf: [], p:'zz1'}, // type=0;知识点，1选择题
      { title: '毛中特一', data: [], type: 1, dataf: [], p: 'zz2'}, // type=0;知识点，1选择题
      { title: '毛中特二', data: [], type: 1, dataf: [], p: 'zz3' }, // type=0;知识点，1选择题
      { title: '哲学练习', data: [], type: 1, dataf: [], p: 'zz4' }, // type=0;知识点，1选择题
      { title: '哲学单选', data: [], type: 1, dataf: [], p: 'zz5' }, // type=0;知识点，1选择题
      { title: '模拟卷一', data: [], type: 1, dataf: [], p: 'zz6' }, // type=0;知识点，1选择题
      { title: '模拟卷二', data: [], type: 1, dataf: [], p: 'zz7' }, // type=0;知识点，1选择题
      { title: '模拟卷三', data: [], type: 1, dataf: [], p: 'zz8' }, // type=0;知识点，1选择题
    ]
  },
  onLoad: function () {
    this.setData({
      test: 100,
      aOpen: !!wx.getStorageSync("aOpen")
    });
  },
  onShow: function(){
    if(!this.data.datas[this.data.menuChosed].data.length){
      this.getData(this.data.menuChosed);
    }
  },
  onShareAppMessage: function(res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习政治`,
      path: '/pages/index/index',
      imageUrl: "https://isluo.com/imgs/wx/wx-study-share.jpg",
    }
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
    }
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
