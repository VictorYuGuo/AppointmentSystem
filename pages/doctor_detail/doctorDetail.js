// pages/doctor_detail/doctorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorDetail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.doctor);
    var doctor = JSON.parse(options.doctor);
    this.setData({
      doctorDetail: doctor,
    })
    console.log(this.data.doctorDetail);
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
   * 在线咨询
   */
  chatOnline: function() {
    wx.navigateTo({
      url: '../../pages/chatview/chatView?pkDoc=' + this.data.doctorDetail.pkDoc + '&docUrl=' + this.data.doctorDetail.docUrl,
    })
  }
})