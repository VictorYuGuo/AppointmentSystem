// pages/chat_history/chat_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.globalData.serverUrl + "/message/find/pkuser",
      data: {
        pkUser: app.globalData.userCode,
      },
      success(res) {
        console.log(res.data.data);
        that.setData({
          chatList: res.data.data,
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

  },

  /**
   * 打开聊天界面
   */
  openChatView:function(e){
    var item = e.target.dataset.chat;
    console.log(item);
    wx.navigateTo({
      url: '../../pages/chatview/chatView?pkDoc=' + item.pkDoc + '&docUrl=' + item.docUrl,
    })
  }
})