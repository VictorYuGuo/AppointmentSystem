// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
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
    var that = this;
    var list = new Array();
    for(var i=0;i<10;i++){
      var item1 = { title:"按摩“五心”养神健体",image:"/picture/health3.jpg"};
      var item2 = { title: "最有益于保护心脏健康的十大食物", image: "/picture/health1.jpg"}
      var item3 = { title: "3种豆类就是糖尿病天敌，稳糖效果不错，不妨试试", image: "/picture/health2.jpg"}
      list.push(item1);
      list.push(item2);
      list.push(item3);
    }
    that.setData({
      list:list,
      
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