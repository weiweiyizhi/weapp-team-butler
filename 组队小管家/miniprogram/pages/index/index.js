//index.js
const app=getApp()
Page({

  data: {
    ad:[],
    datas:[],
    input:'',
    search:[],
    hiddenSearch:true,
  },
  getInf: function () {
    wx.getSetting({
      success: res => {
        wx.openSetting({
          success(res) {
            console.log(res.authSetting)
            res.authSetting = {
              "scope.userInfo": true,
            }
          }
        })
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
            },
            fail: function () {
            }
          })
        }
      }
    })
    this.getOpenid();

  }, 

getOpenid:function(){
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[login] user openid:', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error( err)
    }
  })
  this.add();
},
add:function(){
  setTimeout(() => {
  const db = wx.cloud.database()
  const _ = db.command

  db.collection('users').where({
    _openid: app.globalData.openid
  }).get({
    success: res => {
      console.log('find user:', res)
      if (res.data && res.data.length > 0) {
        wx.showToast({
          title: 'login success',
        })
      } else {

        setTimeout(() => {
          db.collection('users').add({
            data: {
              avatarUrl: app.globalData.userInfo.avatarUrl,
              name: app.globalData.userInfo.nickName,
              sex: app.globalData.userInfo.gender,
              school: 'unknown',
              major: 'unknown',
              wechat:'unknown',
            },
            success: function () {
              wx.showToast({
                title: 'login success',
              })


            },
            fail: function (e) {
              console.log('fail')
            }
          })
        }, 300)
      }
    }
  })
  },1000,)
},

  onLoad: function (options) {
    this.search();
    this.getInf();
   
  },

  search: function () {
    const db = wx.cloud.database()
    const _ = db.command;
 
    db.collection('issue').get({
      success: res => {
        wx.hideLoading()
        var D = res.data;      
        console.log(D)    
        this.setData({
          datas: D
        })
       
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: 'fail'
        })
        console.error(err)
      }
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })

    db.collection('ad').doc('W_30RUXacNtiP6y1').get({
      success: res => {
        wx.hideLoading()
        var D = res.data;
        
        this.setData({
          ad:D.poster,
        })
     
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: 'fail'
        })
        console.error(err)
      }
    })
  },
  refresh: function () {
    this.search()
    wx.showLoading({
      title: '加载中...',
    })
  },
  onPullDownRefresh: function () {
    this.refresh();
    wx.stopPullDownRefresh();
  },

oninput:function(e){
  this.setData({
    hiddenSearch:false,
  })
  var val = e.detail.value;
  const db = wx.cloud.database()
  const _ = db.command;

  db.collection('issue').where({
    teamName:val
  }).get({
    success: res => {
      wx.hideLoading()
      var D = res.data;
      this.setData({
        search: D
      })
      console.log(D)

    },
    fail: err => {
      wx.hideLoading()
      wx.showToast({
        title: '查询记录失败'
      })
      console.error(err)
    }
  })
  wx.pageScrollTo({
    scrollTop: 0,
  })
},
back:function(){
  this.setData({
    hiddenSearch: true,
  })
}
})