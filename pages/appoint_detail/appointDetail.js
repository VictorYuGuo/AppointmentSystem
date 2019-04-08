// pages/appoint_detail/appointDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointDate:"",
    clinic:"",
    subject:"",
    doctor:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl +"/appoint/find/type=userCode&date&dm",
      data:{
        "userCode":app.globalData.userCode,
        "date":app.globalData.searchDay,
        "dm":"0"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res);
        that.setData({
          appointDate:res.data.data['appointDate'].substring(0,10),
          clinic: res.data.data['appointClinic'],
          subject: res.data.data['appointType'],
          doctor: res.data.data['docName'],
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})