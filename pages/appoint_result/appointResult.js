var app = getApp()
var util = require('../../utils/util')

Page({
  data: {
    addrArray: ["请选择就诊诊所", "中山大学附属第三医院", "中山四院", "中山五院"],

    addrIndex: 0,
    date: '2019-03-29',
    time: '12:00',
    bookToastHidden: true,
    multiArray: [
      ['特诊医疗', '内科', '外科', '神经科', '耳喉鼻科', '口腔科', '眼科', '放射科'],
      ['赵医生']
    ],
    multiIndex: [0, 0],
    doctors: [],
    appointClinic: "",
    appointDate: util.formatTime(new Date),
    appointTime: "",
    appointDoctor: "",
    appointInfo: "",
    appointSubject: "",
  },
  onLoad: function(options) {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.globalData.serverUrl + "/clinic/find",
      success(res) {
        // console.log(res);
        var dataList = res.data.data;
        var clinicList = new Array();
        for (var i in dataList) {
          clinicList.push(dataList[i]['docClinic']);
        }
        that.setData({
          addrArray: clinicList,
          appointClinic: clinicList[0],
        })
        // console.log(that.data.addrArray);
      }
    });
    wx.request({
      url: app.globalData.serverUrl + "/appoint/get/subject&doctor",
      success(res) {
        // console.log(res);
        var array = res.data.data;
        var newjson = JSON.stringify(array);
        var json = JSON.parse(newjson);
        // console.log(json['subjects']);
        console.log(json['doctors']);
        var docNames = new Array();
        var doctors = json['doctors'];
        for (var i in doctors) {
          docNames.push(doctors[i]['docName']);
        }
        // console.log(docNames);
        that.setData({
          multiArray: [json['subjects'], json['doctors']],
          doctors: json['doctors'],
          appointDoctor: json['doctors'][0],
          appointSubject: json['subjects'][0],
        })
        // console.log(that.data.multiArray[0]);
        // console.log(that.data.multiArray[1]);
      }
    });
    this.setData({
      date: options.year + "-" + options.month + "-" + options.day,
      appointDate: options.year + "/" + options.month + "/" + options.day,
      appointTime: "12:00",
    })
  },

  // onShow(){
  //   this.setData({
  //     appointClinic: this.data.addrArray[0],
  //     appointDoctor: this.data.doctors[0]['pkDoc'],
  //   })
  // },
  // 地址选择
  bindAddrPickerChange: function(e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value,
      appointClinic: this.data.addrArray[e.detail.value],
    })
    console.log("预约诊所为" + this.data.appointClinic);
  },
  bindToastTap: function() {
    var app = getApp();
    wx.request({
      url: app.globalData.serverUrl + "/appoint/new",
      data: {
        "userCode": app.globalData.userCode,
        "creationTime": app.globalData.openDate,
        "clinic": this.data.appointClinic,
        "appointDate": this.data.appointDate + " " + this.data.appointTime,
        "pkDoc": this.data.appointDoctor['pkDoc'],
        "subject": this.data.appointSubject['docName'],
        "appointInfo": this.data.appointInfo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res);
      }
    })
    console.log('预定成功');
    console.log(this.data.appointClinic);
    console.log(this.data.appointDate);
    console.log(this.data.appointTime);
    console.log(this.data.appointDoctor);
    console.log(this.data.appointSubject);
    console.log(this.data.appointInfo);
    this.setData({
      bookToastHidden: false
    })
  },
  hideToast: function() {
    this.setData({
      bookToastHidden: true
    })
  },
  // 日期选择
  bindDateChange: function(e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      appointDate: e.detail.value,
    })
  },
  // 时间选择
  bindTimeChange: function(e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value,
      appointTime: e.detail.value,
    })
  },

  //预约医生多项选择器绑定函数
  bindMultiDoctorChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      appointDoctor: this.data.multiArray[1][this.data.multiIndex[1]],
      appointSubject: this.data.multiArray[0][this.data.multiIndex[0]],
    })
    console.log(this.data.multiArray);
  },
  bindMultiDoctorColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var that = this;
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiArray[1] = this.data.doctors;
    // console.log(data.multiArray[1]);
    data.multiIndex[e.detail.column] = e.detail.value;
    // switch (e.detail.column) {
    //   case 0:
    //     switch (data.multiIndex[0]) {
    //       case 0:
    //         data.multiArray[1] = ['赵某人', '钱某人', '孙某人'];
    //         break;
    //       case 1:
    //         data.multiArray[1] = ['李某人', '周某人', '吴某人'];
    //         break;
    //     }
    //     data.multiIndex[1] = 0;
    //     data.multiIndex[2] = 0;
    //     break;
    //     data.multiIndex[2] = 0;
    //     console.log(data.multiIndex);
    //     break;
    // }
    var subjectValue = data.multiArray[e.detail.column][e.detail.value]['docName'];
    // if(subjectValue==="口腔科"){
    //   console.log("true");
    // }
    // console.log(data.multiArray[e.detail.column][e.detail.value]['docName']);
    var doctorsSelectedBySubject = data.multiArray[1].filter((p) => {
      return p.docType == subjectValue;
    });
    // console.log(doctorsSelectedBySubject);
    data.multiArray[1] = doctorsSelectedBySubject;
    this.setData(data);
    // that.setData({
    //   multiArray: [data.multiArray[0], doctorsSelectedBySubject],
    // });
  },

  /**
   * 获取输入框的值
   */
  setAppointInfo: function(e) {
    this.setData({
      appointInfo: e.detail.value,
    })
  },

})