
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    datas: []
  },
  
  onLoad: function (options) {
    this.search();
  },
  search: function () {
    db.collection('collect').where(
      {
        _openid: app.globalData.openid,
      }
    ).get({
      success: res => {
        wx.hideLoading()
        var collect = res.data[0].collected;
        console.log(collect)
        var datas = this.data.datas
        datas.length = 0;
        this.setData({
          datas: datas,
        })
      
        for(var i=0;i<collect.length;i++){
          db.collection('issue').doc(collect[i])
          .get({
            success: res => {
              wx.hideLoading()
              var D = res.data;
              datas.push(D);
                this.setData({
                  datas: datas,
                })
           
            }
          })
        }
        console.log(this.data.datas+"dd")
       
      },
 
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  refresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.search()

   
  },
  onPullDownRefresh: function () {
    this.search()
    wx.stopPullDownRefresh();
  },
  onk:function(){

    
  }

})