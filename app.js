//app.js
App({
  globalData: {
    userInfo: null, // 用户信息
    shareImageOpen: false, // 全局 - 分享按钮是否出来
  },
  onLaunch: function () {
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              console.log("用户信息：", this.globalData.userInfo);
            }
          })
        }
      }
    })
  }
})