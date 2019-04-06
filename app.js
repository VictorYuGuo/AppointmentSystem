//app.js
var util = require('/utils/util.js') //引入微信自带的日期格式化
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //获取当前登录时间
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var creationTime = util.formatTime(date);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        console.log(creationTime);
        var app = getApp();
        //通过获取到的code传到后台校验，若系统中已经有存在的微信号则不再新建用户，否则在系统中新建用户
        wx.request({
          url: app.globalData.serverUrl+"/user/new",
          data:{
            "wechat":res.code,
            "type":"0",
            "time":creationTime,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
          },  
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //通过全局变量设置服务器地址
    serverUrl:"http://127.0.0.1:8090",
  }
})