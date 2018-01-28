//index.js
//获取应用实例
const app = getApp()
var items = ['乘客', '车主'];

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mode:'top left',
    src:'../../images/icon-iden.png',
    itemList: items,
    actionSheetItems:items,
    temp:0,
    product1: [{
      index: 0,
      msg: 'this is a template',
      time: '217-09-15'
    }, {
      index: 1,
      msg: 'this is a template',
      time: '2020-09-15'
    }, {
      index: 2,
      msg: 'this is a template',
      time: '2018-09-15'
    },],
    latitude:{},
    longitude:{}
  },
  triggerIdet:function(){
    console.log('aa');
  },
  actionSheetTap: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: items,
      success: function (e) {
        _this.setData({'temp':e.tapIndex});
        console.log(e.tapIndex);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
