const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  // msgList = [{
  //   mFromUserStyle: "0",
  //   mMessage: "发送测试2",
  //   mToUserStyle: "1",
  //   pkDoc: 4,
  //   pkUser: 22,
  //   },
  //   {
  //     mFromUserStyle: "0",
  //     mMessage: "发送测试2",
  //     mToUserStyle: "1",
  //     pkDoc: 4,
  //     pkUser: 22,
  //   }
  // ]
  // that.setData({
  //   msgList,
  //   inputVal
  // })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    socketOpen :false,
    toDoctor: 0,
    socketMsgQueue:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app = getApp();
    var that = this;
    that.setData({
      toDoctor:parseInt(options.pkDoc),
    })
    initData(this);
    this.setData({
      // cusHeadIcon: app.globalData.userInfo.avatarUrl,
      cusHeadIcon: "../../picture/user.png"
    });

    var ws = wx.connectSocket({
      url: "wss://" + "123.207.22.215:8090" + "/websocket/" + app.globalData.userCode,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(wx)
    wx.onSocketOpen(function(res) {
      that.setData({
        socketOpen:true,
      })
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketMessage(function(res) {
      console.log('收到服务器内容：' + res.data);
      if (res.data!="Hello world"){
        console.log('收到服务器内容：' + JSON.parse(res.data).mFromUserStyle);
        msgList.push(JSON.parse(res.data));
        that.setData({
          msgList,
        });
      }
      console.log(msgList);
      
      //！！！即使跳转到其他页面，还是可以接收到服务器的信息
      //当信息服务某个条件是，触发相应事件，这个就需要自己设定了
      if (res.data == '2') {
        wx.showLoading({
          title: 'emmm',
        })
      }
    })
  },

  /**
   * 页面卸载
  */
  onUnload:function(){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    var app = getApp();
    console.log(e.detail.value);
    msgList.push({
      mFromUserStyle: "1",
      mMessage: e.detail.value,
      mToUserStyle: "0",
      pkDoc: this.data.toDoctor,
      pkUser: app.globalData.userCode,
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });

    var message = { pkUser: app.globalData.userCode, pkDoc: this.data.toDoctor, mFromUserStyle: "1",mToUserStyle:"0", mMessage: e.detail.value };           
    //向后台socket发送数据
    console.log(this.data.socketOpen);
    if (this.data.socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(message),
      })
    } else {
        this.data.socketMsgQueue.push(msg)
    }
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})