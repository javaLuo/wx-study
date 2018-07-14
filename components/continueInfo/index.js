/** 阅读到哪里了提示组件 **/
Component({
  /** props **/
  properties:{
    num: { // 题号
      type: Number,
      value: 0
    },
    show: { // 是否显示
      type: Boolean,
      value: false,
    },
    time: {
      type: Number,
      value: 5,
    }
  },

  /** state **/
  data: {

  },

  /** 自定义方法 **/
  methods:{
    onClick: function(){
      this.triggerEvent('onTap', {a:123}, {b:345})
    }
  }
})