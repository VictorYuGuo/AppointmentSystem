// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportDate: "", //报告日期
    doctorName: "", //医生姓名
    doctorUrl: "", //医生照片
    reportResult: "", //结果
    reportSubject: "", //科室
    display1: "block",
    display2: "none",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl + "/report/find/type=usercode&reportdate&dm",
      data: {
        "code": app.globalData.userCode,
        "date": app.globalData.searchDay,
        "dm": "0",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.data == null) {
          that.setData({
            display1: "none",
            display2: "block",
          })
        } else {
          console.log(res);
          console.log(res.data.data);
          var array = res.data.data;
          console.log(array);
          var newjson = JSON.stringify(array);
          var json = JSON.parse(newjson);
          that.setData({
            doctorName: json['docName'],
            doctorUrl: json['docUrl'],
            reportResult: json['reportResult'],
            reportSubject: json['subject'],
          });
        }
      },
    })
    // console.log(app.globalData.userCode);
    // console.log(app.globalData.serverUrl);
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

  }
})