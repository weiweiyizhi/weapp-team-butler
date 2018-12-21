// miniprogram/pages/myInf/myInf.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/me.png',
    name:' ',
    school:'',
    major:'',
    wechat:'',
    sex:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onshowInf();
  },
  onshowInf:function(){
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('users').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          avatarUrl: res.data[0].avatarUrl,
          name: res.data[0].name,
          school: res.data[0].school,
          major: res.data[0].major,
          wechat: res.data[0].wechat,
          sex:res.data[0].sex,
        })
        app.globalData.userid=data[0]._id;
      }
    })
  },
  getSchool: function (e) {
    var val = e.detail.value;
    this.onUpdate(1,val);
    this.onshowInf();
  },
  getMajor: function (e) {
    var val = e.detail.value;
    this.onUpdate(2, val);
    this.onshowInf();
  },
  getWechat: function (e) {
    var val = e.detail.value;
    this.onUpdate(3, val);
  },
  onUpdate: function (a,b) {
  
    const db = wx.cloud.database()
    const _ = db.command
    if(a==1){
      db.collection('users').doc(app.globalData.userid).update({
        data: {
          school: b,
        },
        fail: err => {
          wx.showToast({
            title: 'fail'
          })
        }
      })
    }
    else if(a==2){
      db.collection('users').doc(app.globalData.userid).update({
        data: {
          major: b,
        },
        fail: err => {
          wx.showToast({
            title: 'fail'
          })

        }
      })
    }
    else if(a==3){
      db.collection('users').doc(app.globalData.userid).update({
        data: {
          wechat: b,
        },
        fail: err => {
          wx.showToast({
            title: 'fail'
          })

        }
      })
    }
    
  },

})