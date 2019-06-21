/** 政治页 **/
const app = getApp(); // 全局实例
const tools = require('../../utils/util.js');
const server = require('../../utils/server.js'); // ajax

let scrollTimer = null; // 滚动计时器

Page({
  data: {
    app,
    canShow: false,
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop: 0, // 用于菜单蓝色div的offsetTop
    aOpen: false, // 是否高亮答案
    datas: [
      // 当前页所有原始数据
      // title:标题，data:原始数据,type:0知识点/1选择题，dataf:构建后的对象，p:相当于id， t:当前滚动的高度,tt:同步高度时设置, c:是否显示提示
      { title: '知识点', data: [], type: 0, dataf: [], p: 'zz1' }, // type=0;知识点，1选择题
      { title: '毛中特一', data: [], type: 1, dataf: [], p: 'zz2' }, // type=0;知识点，1选择题
      { title: '毛中特二', data: [], type: 1, dataf: [], p: 'zz3' }, // type=0;知识点，1选择题
      { title: '哲学练习', data: [], type: 1, dataf: [], p: 'zz4' }, // type=0;知识点，1选择题
      { title: '哲学单选', data: [], type: 1, dataf: [], p: 'zz5' }, // type=0;知识点，1选择题
      { title: '模拟卷一', data: [], type: 1, dataf: [], p: 'zz6' }, // type=0;知识点，1选择题
      { title: '模拟卷二', data: [], type: 1, dataf: [], p: 'zz7' }, // type=0;知识点，1选择题
      { title: '模拟卷三', data: [], type: 1, dataf: [], p: 'zz8' }, // type=0;知识点，1选择题
      { title: '2018试题', data: [], type: 1, dataf: [], p: 'zz9' }, // type=0;知识点，1选择题
    ],
    scrollTops: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 每一项的scrollTop,这么做是因为放在datas中，更新datas时会重复触发scroll-view的设置top事件，所以单独拿出来
    showa: [[], [], [], [], [], [], [], [], []],
  },

  /** 加载完毕 **/
  onLoad: function() {},

  /** 加载完毕并且渲染完毕 **/
  onReady: function() {
    this.setData({
      aOpen: !!wx.getStorageSync('aOpen'),
    });
  },

  /** 页面每次出现 **/
  onShow: function() {
    if (!this.data.datas[this.data.menuChosed].data.length) {
      this.getData(this.data.menuChosed);
    }
    this.setData({
      canShow: true,
    });
  },

  /** 页面每次隐藏 **/
  onHide: function() {
    clearTimeout(scrollTimer);
    this.shareImageOpenChange(false);
    this.setData({
      canShow: false,
    });
  },

  /** 页面分享时 **/
  onShareAppMessage: function(res) {
    return {
      title: `${app.globalData.userInfo.nickName || '专升本'}邀您来复习政治`,
      path: '/pages/index/index',
      imageUrl: 'https://isluo.com/imgs/wx/wx-study-share.jpg',
    };
  },

  // 滚动时触发，记录当前这个分类滚动到多高了
  onScroll: function(e) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      wx.setStorage({ key: `top-${this.data.menuChosed}`, data: e.detail.scrollTop });
    }, 50);
  },

  // 高亮答案改变
  aOpenSwitchChange(e) {
    this.setData({
      aOpen: e.detail.value,
      showa: [[], [], [], [], [], [], [], []],
    });
    wx.setStorageSync('aOpen', e.detail.value);
  },

  // 左侧菜单选择时触发
  chosemenu: function(e) {
    if (e.currentTarget.dataset.index !== this.menuChosed) {
      const d = this.data.datas[e.currentTarget.dataset.index];
      this.setData({
        menuChosed: Number(e.currentTarget.dataset.index),
        menuHuaTop: e.target.offsetTop,
      });
      if (!d.data.length) {
        this.getData(e.currentTarget.dataset.index); // 没数据就先获取数据
      } else {
        this._updateScrollTop(e.currentTarget.dataset.index); // 有数据就更新一下高度
      }
    }
  },

  // 更新数据的t值，让滚动条滚动到上一次看的位置，每次打开小程序仅触发一次
  _updateScrollTop: function(index) {
    if (this.data.scrollTops[index] !== 0) {
      // 不等于0说明已经设置过了
      return;
    }
    const top = wx.getStorageSync(`top-${index}`);

    if (top) {
      this.data.scrollTops[index] = top;
      console.log('触发呀：', index, this.data.scrollTops[index], top);
      this.setData({
        scrollTops: this.data.scrollTops,
      });
    }
  },

  // 点击某一个题目时
  onScrollTap(e) {
    console.log('点击触发：', e);
    if (this.data.aOpen) {
      // 已经是答案全部高亮状态，直接返回
      return;
    }
    console.log('DATA的样子', this.data.datas[this.data.menuChosed].showa);
    this.data.showa[this.data.menuChosed][Number(e.currentTarget.id.split('-').pop()) - 1] = true;
    this.setData({
      showa: this.data.showa,
    });
  },

  // 获取数据
  getData: function(index) {
    // 先看缓存有没有，有就取缓存
    const haveCache = this.getDataFromCache(index);
    if (!haveCache) {
      // 说明没有cache
      wx.showLoading({
        // 没有cache就显示加载中，准备请求接口。
        title: '加载中...',
      });
    }

    // 请求新的数据，即便有cache也会请求
    server
      .request('main/todo.do', { m: 'getStudy', p: this.data.datas[index].p })
      .then(res => {
        if (res.data && res.data.status === '0') {
          const temp = [...this.data.datas];
          temp[index].data = res.data.data;
          if (temp[index].type === 0) {
            temp[index].dataf = res.data.data.map((item, index) => tools.format0(item, index));
          } else if (temp[index].type === 1) {
            let temp_i = 0;
            temp[index].dataf = res.data.data.map(item => {
              if (item.charAt(0) !== 'T') {
                temp_i++;
              }
              console.log('是什么：', item, temp_i);
              return tools.format1(item, temp_i);
            });
          }
          wx.setStorage({ key: `zz-index${index}`, data: res.data.data }); // 将新的原始数据存入缓存
          if (!haveCache) {
            // 如果没有缓存，就重新设置，否则就只是把新数据存入缓存，下次打开小程序时就是最新的了
            this.setData({
              datas: temp,
            });
            wx.hideLoading();
          }
          this._updateScrollTop(index);
        } else {
          if (!haveCache) {
            wx.showToast({
              title: '获取数据失败，请重试',
              icon: 'none',
            });
          }
        }
      })
      .catch(e => {
        wx.showToast({
          title: '网络错误，将尝试从缓存获取数据',
          icon: 'none',
        });
      });
  },

  // 从缓存获取原始数据
  getDataFromCache(index) {
    const data = wx.getStorageSync(`zz-index${index}`);
    if (data) {
      wx.showLoading({
        title: '正在构建...',
      });
      const temp = [...this.data.datas];
      temp[index].data = data;
      if (temp[index].type === 0) {
        temp[index].dataf = data.map((item, index) => tools.format0(item, index));
      } else if (temp[index].type === 1) {
        let temp_i = 0;
        temp[index].dataf = data.map(item => {
          if (item.charAt(0) !== 'T') {
            temp_i++;
          }
          return tools.format1(item, temp_i);
        });
      }
      this.setData({
        datas: temp,
      });
      wx.hideLoading();
      return true;
    }
    return false;
  },

  // 分享图片按钮出现的状态
  shareImageOpenChange(e) {
    app.globalData.shareImageOpen = e.detail;
    this.setData({
      app,
    });
  },

  // 页面开始触发
  onPageTouchStart(e) {
    if (app.globalData.shareImageOpen) {
      app.globalData.shareImageOpen = false;
      this.setData({
        app,
      });
    }
  },
});
