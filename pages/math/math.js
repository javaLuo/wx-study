//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    app,
    canShow: false, // 为了分享的图片框，切换时让其自动消失
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
      {
        title: '大题必考',
        data: [
          {t: '一、一阶偏导数/全微分', i: [
            "形如z=f(x,y)",
            "求δz/δx，就是求x的偏导数，把y看作常数，对x求导",
            "求δz/δy，就是求y的偏导数，把x看作常数，对y求导",
            "求dz，就是求全微分, 公式：",
          ],img: "https://isluo.com/imgs/wx/math/bk01.jpg"},
          {t:'二、二阶偏导/混合偏导',i:[
            "δ²z/δx²，就是求x的二阶偏导，把y看作常数对x求导，然后再一次把y看作常数对x求导",
            "δ²z/δy²，就是求y的二阶偏导，把x看作常数对y求导，然后再一次把x看作常数对y求导",
            "δ²z/δxδy，就是求混合偏导，先把y看作常数对x求导，然后把x看作常数对y求导",
            "δ²z/δyδx，就是换了一下位置，先把x看作常数对y求导,然后把y看作常数对x求导"
          ], img:"https://isluo.com/imgs/wx/math/bk02.jpg"},
         {
           t:'三、隐函数求偏导/全微分', i:[
             '化成F(x,y,z)=0形式再求，公式：'
           ],
           img: 'https://isluo.com/imgs/wx/math/bk03.jpg'
         },
          {
            img: 'https://isluo.com/imgs/wx/math/bk04.jpg'
          },
          {
            t: '四(一)、隐函数求极值(无条件)', i: [
              '1.求一阶各偏导，得驻点',
              '2.求二阶各偏导，驻点带入ABC',
              '3.判别：B²-AC<0则有极值，>=0无极值; A>0有极小值，<0有极大值',
            ],
            img: 'https://isluo.com/imgs/wx/math/bk05.jpg'
          },
          {
            t: '四(二)、隐函数求极值(有条件)', i: [
              '1.构造F函数',
              '2.求驻点(如果有多个驻点就是有多个极值)',
              '3.解得极值',
            ],
            img: 'https://isluo.com/imgs/wx/math/bk06.jpg'
          }
        ]
      }
    ]
  },
  onLoad: function () {
  },

  onShow: function(){
    this.setData({
      canShow: true,
    })
  },

  onHide: function () {
    this.shareImageOpenChange(false);
    this.setData({
      canShow: false,
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: `${app.globalData.userInfo.nickName || "专升本"}邀您来复习数学，起床，吃饭，学习，睡觉！`,
      path: '/pages/math/math',
      imageUrl: "https://isluo.com/imgs/wx/wx-study-share.jpg",
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
  },

  // 分享图片按钮出现的状态
  shareImageOpenChange(e) {
    app.globalData.shareImageOpen = e.detail;
    this.setData({
      app,
    })
  },
  // 页面开始触发
  onPageTouchStart(e) {
    if (app.globalData.shareImageOpen) {
      app.globalData.shareImageOpen = false;
      this.setData({
        app,
      })
    }
  }
})
