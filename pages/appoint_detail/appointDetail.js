// pages/appoint_detail/appointDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointDate: "",
    clinic: "",
    subject: "",
    doctor: "",
    display1: "block",
    display2: "none",
    bookToastHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl + "/appoint/find/type=userCode&date&dm",
      data: {
        "userCode": app.globalData.userCode,
        "date": app.globalData.searchDay,
        "dm": "0"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.data == null) {
          that.setData({
            display1: "none",
            display2: "block",
          })
        } else {
          that.setData({
            appointDate: res.data.data['appointDate'].substring(0, 10),
            clinic: res.data.data['appointClinic'],
            subject: res.data.data['appointType'],
            doctor: res.data.data['docName'],
          })
        }
      }
    })
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

  bindToastTap: function () {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.globalData.serverUrl + "/appoint/delete",
      data: {
        "userCode": app.globalData.userCode,
        "appointDate": this.data.appointDate,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res);
        that.setData({
          bookToastHidden: false
        })
      }
    })
  },
  hideToast: function () {
    this.setData({
      bookToastHidden: true
    })
  },
})