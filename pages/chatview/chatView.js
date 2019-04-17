const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var util = require('../../utils/util.js'); //引入微信自带的日期格式化
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
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
    socketOpen: false,
    toDoctor: 0,
    socketMsgQueue: [],
    userInfo: {},
    docUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app = getApp();
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
      toDoctor: parseInt(options.pkDoc),
      docUrl: options.docUrl,
    })
    initData(this);
    this.setData({
      // cusHeadIcon: app.globalData.userInfo.avatarUrl,
      cusHeadIcon: this.data.userInfo.avatarUrl,
    });

    //首次加载页面先去数据库加载历史聊天记录
    wx.request({
      url: app.globalData.serverUrl + "/message/find/type=pkuser&pkdoc",
      data: {
        "pkUser": app.globalData.userCode,
        "pkDoc": that.data.toDoctor,
      },
      success(res) {
        console.log(res.data.data);
        var messages = res.data.data;
        for(var i in messages){
          msgList.push(messages[i]);
        }
        that.setData({
          msgList,
        })
      }
    })

    //开启websocket
    var ws = wx.connectSocket({
      //正式环境
      url: "wss://" + "123.207.22.215:8090" + "/websocket/" + app.globalData.userCode,
      //测试环境
      // url: "ws://" + "127.0.0.1:8090" + "/websocket/" + app.globalData.userCode,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(wx);
    wx.onSocketOpen(function(res) {
      that.setData({
        socketOpen: true,
      })
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketMessage(function(res) {
      console.log('收到服务器内容：' + res.data);
      console.log('收到服务器内容：' + JSON.parse(res.data).mFromUserStyle);
      msgList.push(JSON.parse(res.data));
      that.setData({
        msgList,
      });
      console.log(msgList);

      //！！！即使跳转到其他页面，还是可以接收到服务器的信息
      //当信息服务某个条件是，触发相应事件
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
  onUnload: function() {
    //页面卸载将页面数据清空
    msgList=[];
    this.setData({
      msgList,
    })
    wx.closeSocket({
      reason:"离开界面",
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var app = getApp();
    // var that = this;
    // if (!that.data.socketOpen) {
    //   console.log('开始尝试连接WebSocket');
    // }
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
    //发送时间
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var mTime = util.formatTime(date);
    var message = {
      pkUser: app.globalData.userCode,
      pkDoc: this.data.toDoctor,
      mFromUserStyle: "1",
      mToUserStyle: "0",
      mMessage: e.detail.value,
      mTime: mTime
    };
    //向后台socket发送数据
    console.log(this.data.socketOpen);
    if (this.data.    socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(message),
      })
    } else {
      // this.data.socketMsgQueue.push(msg)
    }
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})