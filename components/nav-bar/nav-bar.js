// components/nav-bar/nav-bar.js
const app = getApp()
Component({
//开启多插槽
    options:{
        multipleSlots:true
    },

    properties: {
        title:{
            type:String,
            value:"导航标题"
        }
    },
    methods:{
        tovoucher: function (options) {
            wx.navigateBack()
          },
    },
    data: {
        statusHeight:20
    },
    lifetimes: {
        attached() {
            this.setData({statusHeight: app.globalData.statusHeight})
        }
    }
})
