// pages/personal_data/personalData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray:[{name:"man",value:"男",checked:"true"},{name:"women",value:"女"}],
    name:"",
    sex:"",
    phone:"",
    type:"",
    hidden:true,
    hiddenSex:true,
    hiddenPhone:true,
    editName:"",
    editSex:"",
    editPhone:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this;
    var user;
    wx.request({
      url: app.globalData.serverUrl+"/user/find",
      data:{
        userCode:app.globalData.userCode,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(res);
        var user = res.data.data;
        that.setData({
          name:user.userName,
          editName:user.userName,
          sex:user.userSex,
          phone:user.userPhone,
          type:user.userType,
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

  confirmName:function(e){
    // console.log(e.detail.value);
    var that = this;
    that.setData({
      hidden:true,
      name:that.data.editName,
    })
    wx.request({
      url: app.globalData.serverUrl + "/user/update",
      data: {
        "name": that.data.name,
        "phone": that.data.phone,
        "sex": that.data.sex,
        "userCode": app.globalData.userCode,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res);
      }
    })
  },

  cancelName:function(e){
    this.setData({
      hidden: true,
    })
  },

  confirmPhone: function (e) {
    // console.log(e.detail.value);
    var that = this;
    that.setData({
      hiddenPhone: true,
      phone: that.data.editPhone,
    })
    wx.request({
      url: app.globalData.serverUrl + "/user/update",
      data: {
        "name": that.data.name,
        "phone": that.data.phone,
        "sex": that.data.sex,
        "userCode": app.globalData.userCode,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res);
      }
    })
  },

  cancelPhone: function (e) {
    this.setData({
      hiddenPhone: true,
    })
  },

  confirmSex:function(e){
    var app = getApp();
    var that = this;
    that.setData({
      hiddenSex: true,
      sex: that.data.editSex,
    })
    wx.request({
      url: app.globalData.serverUrl+"/user/update",
      data:{
        "name":that.data.name,
        "phone":that.data.phone,
        "sex":that.data.sex,
        "userCode":app.globalData.userCode,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      success(res){
        console.log(res);
      }
    })
  },

  cancelSex:function(e){
    this.setData({
      hiddenSex: true,
    })
  },

  getInputName:function(e){
    var that = this;
    console.log(e.detail.value);
    that.setData({
      editName:e.detail.value,
    })
  },

  getInputPhone: function (e) {
    var that = this;
    that.setData({
      editPhone: e.detail.value,
    })
  },

  editName:function(e){
    this.setData({
      hidden:false,
    })
  },

  editPhone: function (e) {
    this.setData({
      hiddenPhone: false,
    })
  },

  editSex: function (e) {
    this.setData({
      hiddenSex: false,
    })
  },

  radioChange:function(e){
    console.log(e.detail.value);
    this.setData({
      editSex: e.detail.value,
    })
  }
})