// pages/appoint_history/appointHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl +"/appoint/find/type=userCode&dm",
      data:{
        "userCode":app.globalData.userCode,
        "dm" :"0",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res);
        var list = res.data.data;
        for(var i in list){
          list[i]['appointDate'] = list[i]['appointDate'].substring(0,10);
        }
        that.setData({
          dataList:list,
        })
        console.log(that.data.dataList);
      }
    });
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