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
    nextMargin: 0,
    listTop: [],
    listBottom: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app = getApp();
    var that = this;
    var list = new Array();
    var list2 = new Array();
    var item1 = {
      artTitle: "按摩“五心”养神健体",
      artPicture: "/picture/health3.jpg",
      artText: "睡觉的时候按摩头皮，可以起到缓解压力的作用，可以起到安眠的作用，对有多种好处，按摩身体穴位对是有多种好处的，穴位是的重要器官，穴位可以起到保健身体的功效，也可以起到预防疾病的作用，通过穴位按摩能很好的缓解身体疲劳，按摩“五心”养神健体.",
    };
    var item2 = {
      artTitle: "最有益于保护心脏健康的十大食物",
      artPicture: "/picture/health1.jpg",
      artText: "人到中年以后，那么肯定会出现一些疾病的，而且就像一些心脏病之类的也是非常常见的，所以这个时候就应该记得，就应该要多吃一些饮食，才可以帮助自己的生活中，有利于保护心脏的最健康的十大食物，也是非常常见的，而且这些食物到底有哪些呢？1: 植物油。植物油含有的亚油酸对保护心脏至关重要，所以建议您每天尽量消耗2--4茶匙2:西红柿。西红柿不仅可以美肤，更重要的是，它是血液的净化器。另外，西红柿含有大量的维生素K，可预防出血。3:燕麦。燕麦中含有一种可溶性纤维，有助于降低胆固醇水平，尤其是低密度脂蛋白这种“坏胆固醇会增加心脏病的风险)",
    }
    var item3 = {
      artTitle: "3种豆类就是糖尿病天敌，稳糖效果不错，不妨试试",
      artPicture: "/picture/health2.jpg",
      artText: "我们都知道豆类食物里面含有丰富的营养物质，如果想健康长寿，就可以多吃一些豆类食物，尤其是糖尿病患者，在生活中多吃一些豆类食物，稳定血糖是非常有效的，有三种豆类可以说是糖尿病的天敌，糖尿病患者不妨多吃一些，一起看看有哪三种豆类，对于稳定血糖有帮助吧。第一款：蚕豆蚕豆中的粗纤维和其他有效营养成分对调整糖友的血压有明显的疗效，大量的膳食纤维可以在一定程度上降低餐后血糖值，更可预防高血压并发症。蚕豆蛋白质高达21.6 %，膳食纤维17% 及丰富的钾、铁、锌等营养成分; 其蛋白质氨基酸较为齐全，丰富的膳食纤维具有降低胆固醇，促进肠道蠕动的作用。第二款：豇豆豇豆分长豇豆和饭豇豆两种，但无论是哪种豇豆，其中所含的磷脂都有促进胰岛素分泌、参加糖代谢的作用，是糖友的理想食品。豇豆中的磷脂可以促进胰岛素分泌，加速新陈代谢。豇豆中的烟酸是天然的血糖调节剂，可加强糖代谢。第三款：豌豆豌豆含有大量的铬元素，这是一种可以起到促进胰岛素分泌作用的微量元素，是糖友们所需要的。豌豆特别是含铜、铬等微量元素较多， 铜有利于造血以及骨骼和脑的发育; 铬有利于糖和脂肪的代谢， 能维持岛素的正常功能。",
    }
    list.push(item1);
    list.push(item2);
    list.push(item3);
    wx.request({
      url: app.globalData.serverUrl + "/article/find",
      success(res) {
        var results = res.data.data;
        console.log(res.data.data);
        // for (var i in results){
        //   list2.push(results[i]);
        // }
        // console.log(list2);
        that.setData({
          listBottom: results,
        })
      },

    })
    that.setData({
      listTop: list,
    })
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

  openUrl: function(e) {
    var id = e.target.dataset.id;
    var data = this.data.listTop[id];
    var toUrl = "../article_detail/articleDetail?title=" + data.artTitle + "&picture=" + data.artPicture + "&text=" + data.artText;
    wx.navigateTo({
      url: toUrl,
    })
  }
})