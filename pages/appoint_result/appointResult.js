var app = getApp()
var util = require('../../utils/util')

Page({
  data: {
    addrArray: ["请选择就诊诊所","中山大学附属第三医院","中山四院","中山五院"],
    addrIndex: 0,
    date: '2019-03-29',
    time: '12:00',
    bookToastHidden: true,
    multiArray: [['特诊医疗', '内科', '外科', '神经科', '耳喉鼻科', '口腔科', '眼科', '放射科'], ['赵医生']],
    multiIndex: [0, 0],
  },
  onLoad: function (options) {
    this.setData({
      // artype: options.artype
      // year:options.year,
      // month:options.month,
      // day:options.day,
      date: options.year + "-" + options.month + "-" + options.day,
    })
  },
  // 地址选择
  bindAddrPickerChange: function (e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },
  bindToastTap: function () {
    console.log('预定成功')
    this.setData({
      bookToastHidden: false
    })
  },
  hideToast: function () {
    this.setData({
      bookToastHidden: true
    })
  },
  // 日期选择
  bindDateChange: function (e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange: function (e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  //预约医生多项选择器绑定函数
  bindMultiDoctorChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiDoctorColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['赵某人', '钱某人', '孙某人'];
            break;
          case 1:
            data.multiArray[1] = ['李某人', '周某人', '吴某人'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

})