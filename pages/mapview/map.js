// pages/mapview/map.js

// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化地图API核心类
    qqmapsdk = new QQMapWX({
    key: '3A7BZ-V4ZCR-OAXWU-WFEPU-52VV3-ZFB7O'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初次渲染定位
    var that = this

    wx.getLocation({

      type: 'wgs84',

      success: function (res) {

        console.log(res)

        var latitude1 = res.latitude

        var longitude1 = res.longitude

        qqmapsdk.reverseGeocoder({

          location: {

            latitude: latitude1,

            longitude: longitude1

          },

          success: function (res) {

            console.log(res);

            var add = res.result.address

            that.setData({

              latitude2: latitude1,

              longitude2: longitude1,

              address: add,

            })

          }

        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})