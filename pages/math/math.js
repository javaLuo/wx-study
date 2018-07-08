//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuChosed: 0, // 当前选择的哪个菜单
    menuHuaTop:0,
    datas: [  // 当前页所有原始数据
      {
        title: '幂函数', data: [
          { t: "平方差公式", img: "https://isluo.com/imgs/wx/math/x1.jpg" },
          { t: "完全平方公式", img: "https://isluo.com/imgs/wx/math/x2.jpg" },
          { t: "立方公式", img: "https://isluo.com/imgs/wx/math/x3.jpg" },
        ]
      },
      {
        title: '三角函数', data: [
          {img: "https://isluo.com/imgs/wx/math/sin.jpg"},
          { t: "特殊值表", img: "https://isluo.com/imgs/wx/math/sin2.png", click: true },
        ]
      },
      {
        title: '对数', data: [
          { img: "https://isluo.com/imgs/wx/math/log.jpg" }
        ]
      },
      {
        title: '极限', data: [
          { img: "https://isluo.com/imgs/wx/math/lim.jpg" },
          {
            t: "洛必达法则",
            i: ["简而言之就是：(0/0)型或(无穷/无穷)型的分式求极限可以分子分母分别求导后再求极限","若求导后仍然是(0/0)或(无穷/无穷),可继续使用洛必达"],
            img: "https://isluo.com/imgs/wx/math/luobida.jpg"
          },
        ]
      },
      {
        title: '导数', data: [
          { img: "https://isluo.com/imgs/wx/math/y.png" },
          { t: "切线方程", img: "https://isluo.com/imgs/wx/math/yq.jpg" },
          { t: "法线方程", i:["法线与切线垂直，所以求导后得到斜率，斜率的倒数代入原切线方程即可"], img: "https://isluo.com/imgs/wx/math/yf.jpg" },
        ]
      },
      {
        title: '积分', data: [
          { t: '一、乘除化加减、套公式', img: "https://isluo.com/imgs/wx/math/fx1.jpg" },
          { t: '二、找朋友（凑微分）', i:[
            "(1) 直线、曲线，高次与低次做朋友（次数相差1即可），即将高次看成方框凑成微分",
            "(2) 三角函数sin和cos互为朋友",
            "(3) lnx与1/x做朋友"
          ], img: "https://isluo.com/imgs/wx/math/fx2.jpg"},
          { t: '三、分部积分法', i: ["(1) 三角函数、指数函数看成v'，幂看成u", "(2) 反三角函数、对数函数看成u, 幂看成v'"], img:"https://isluo.com/imgs/wx/math/fx3.jpg"},
          { t: "四、先积后导互相抵消；先导后积互相抵消+C", img: 'https://isluo.com/imgs/wx/math/fx4.jpg'},
          { t: "五、定积分", img: "https://isluo.com/imgs/wx/math/fx5.jpg"},
          { t: "六、积分上限函数、求导", img: "https://isluo.com/imgs/wx/math/fx6.jpg"},
          { t: "七、广义积分", i: ["即上限或下限中有无穷，可以把无穷看成一个常数，求出来后再求其极限"], img: "https://isluo.com/imgs/wx/math/fx7.jpg" }
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
  },
  onImageTap: function(e){
    console.log(e);
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.datas[this.data.menuChosed].data.reduce((res, item)=>{
        if(item.img)res.push(item.img);
        return res;
      },[])
    });
  }
})
