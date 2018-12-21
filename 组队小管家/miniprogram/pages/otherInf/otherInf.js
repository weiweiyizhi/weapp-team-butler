const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/me.png',
    name: ' ',
    school: '',
    major: '',
    wechat: '',
    sex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onshowInf(options.id)
  },
  onshowInf: function (openid) {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('users').where({
      _openid:openid
    }).get({
      success: res => {
        this.setData({
          avatarUrl: res.data[0].avatarUrl,
          name: res.data[0].name,
          school: res.data[0].school,
          major: res.data[0].major,
          wechat: res.data[0].wechat,
          sex: res.data[0].sex,
        })
        app.globalData.userid = data[0]._id;
       
      }
    })
  },
 

})