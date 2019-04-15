// pages/mainview/mainview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 4000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
    * 用户点击检查报告即跳转至检查报告预览界面
    */
  getReport: function (e) {
    wx.navigateTo({
      url: '../report/report',
    })
  },

  /**
   * 用户点击就诊记录获取历史就诊信息
   */
  getTreatmentHistory:function(e){
    wx.navigateTo({
      url: '../treatment_history/treatmentHistory',
    })
  },

  /**
   * 用户点击预约助理即可查询当天预约信息
   */
  getAppointHistory:function(e){
    wx.navigateTo({
      url: '../appoint_detail/appointDetail',
    })
  },
  
  /**
   * 打开备忘录
   */
  openNote:function(e){
    wx.navigateTo({
      url: '../noteview/noteview',
    })
  },

  /**
   * 打开消费记录
   */
  openConsume:function(e){
    wx.navigateTo({
      url: '../consume/consume',
    })
  }
})