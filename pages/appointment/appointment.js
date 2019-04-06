// pages/appointment/appointment.js

// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: [{
      date: '2018-5-21'
    }, {
      date: '2018-5-22'
    }, {
      date: '2018-5-24'
    }, {
      date: '2018-5-25'
    }]
  },

  /**
   * 日历是否被打开
   */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log(time)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化地图API核心类
    qqmapsdk = new QQMapWX({
      key: '3A7BZ-V4ZCR-OAXWU-WFEPU-52VV3-ZFB7O'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 打开地图
   */
  openMap: function(e) {
      console.log(e.target.dataset.text);
      qqmapsdk.geocoder({
        address: e.target.dataset.text,
        success: function(res) {
          wx.openLocation({ //​使用微信内置地图查看位置。
            name: `${res.result.address_components.province}-${res.result.address_components.district}`,
            address: `${res.result.address_components.province}${res.result.address_components.district}${res.result.title}`,
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          })
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
        },
      })
    
  }
})