// pages/doctor/doctor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav: 0,
    doctors:[],
    subjects:[],
    selectedDoctors:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl + "/appoint/get/subject&doctor",
      success(res) {
        // console.log(res);
        that.setData({
          doctors:res.data.data['doctors'],
          subjects:res.data.data['subjects'],
        })
        console.log(that.data.doctors);
        console.log(that.data.subjects);
        var dataList = that.data.doctors;
        var selectedData = dataList.filter((p) => {
          console.log(that.data.subjects[0]['docName']);
          return p.docType == that.data.subjects[0]['docName'];
        });
        that.setData({
          selectedDoctors:selectedData,
        })
      },
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

  /* 把点击到的某一项 设为当前curNav   */
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    console.log(id);
    var dataList = this.data.doctors;
    var selectedData = dataList.filter((p) => {
      console.log(this.data.subjects[id]['docName']);
      return p.docType == this.data.subjects[id]['docName'];
    });
    console.log(selectedData);
    this.setData({
      curNav: id,
      selectedDoctors:selectedData,
    })
  },

  /*选择医生时跳转至医生详细信息*/ 
  chooseDoctor:function(e){
    var doctorDetail = JSON.stringify(e.target.dataset.doctor);
    console.log(doctorDetail);
    wx.navigateTo({
      url: '../../pages/doctor_detail/doctorDetail?doctor='+doctorDetail,
    })
  }
})