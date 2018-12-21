// miniprogram/pages/competitionInf/competitonInf.js
const db = wx.cloud.database()
const _ = db.command
var app = getApp()
var firstId;
Page({

  data: {
    collected:[],
    join:[],
    datas:[],
    member:[],
    data:{},
    commentTxt: '',
    comments: [],
    collectIc:'../../images/collect1.png',
    hiddeninput:true,
    arr:[],
  },

  onLoad: function (options) {
      firstId=options.id;
      this.search(options.id)
    setTimeout(() => {
      this.ifcollected();
    }, 100)
  },
  search: function (id) {
    var member;
    db.collection('issue').where({
      _id:id
    }).get({
      success: res => {
        let D = res.data;
        app.globalData.collectId=D[0]._id;
        this.setData({
          datas: D[0],
          comments:D[0].comment,
          member:D[0].member,
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  onCollect:function(){
    if (this.data.collectIc == '../../images/collect.png'){
      wx.showToast({
        title: 'U‘ve collected',
        image: '../../images/minus.png',
      })
    return;
    }

    this.setData({
      collectIc: '../../images/collect.png'
    })

    setTimeout(() => {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('collect').where({
        _openid: app.globalData.openid
      }).get({
        success: res => {
          if (res.data && res.data.length > 0) {
            setTimeout(() => {
            db.collection('collect').doc(res.data._id).update({
              data: {
                collected: _.push(app.globalData.collectId),
              },
              success:res=>{
             
              }
        
            })
            }, 100)
          }
           else {

            setTimeout(() => {
              var collected=this.data.collected;
              collected.push(app.globalData.collectId)
              this.setData({
                collected:collected,
              })
              db.collection('collect').add({
                data: {
                  collected:this.data.collected,
                },
                success: function () {
                 console.log('success')
                },
               
              })
            }, 100)
          }
        }
      })
    }, 200, )
  },
  onApply:function(){
    const db = wx.cloud.database()
    const _ = db.command
    const util = require('../../util/util.js');
    let d = new Date(), data = {};
    var arr = this.data.arr;
    arr.length=0;
      data = {
        avatar: app.globalData.userInfo.avatarUrl,
        openid: app.globalData.openid,
        username: app.globalData.userInfo.nickName,
      }
      arr.push(data)

      if(this.data.member.length>=5)
      {
        wx.showToast({
          title: 'full',
          image: '../../images/minus.png',
        })
        return;
      }
  for(var i=0;i<this.data.member.length;i++){
    if (this.data.member[i].openid==data.openid) {
      wx.showToast({
        title: 'you‘ve joined',
        image: '../../images/minus.png',
      })
      return;
    }
  }
    wx.cloud.callFunction({
      name: 'join',
      data: {
        member: arr,
        firstId: firstId,
      },
      success: res => {
        wx.showToast({
          title: 'join success',
        })
        setTimeout(() => {
          db.collection('join').where({
            _openid: app.globalData.openid
          }).get({
            success: res => {
              if (res.data && res.data.length > 0) {
                setTimeout(() => {
                  db.collection('join').doc(res.data._id).update({
                    data: {
                      join: _.push(app.globalData.collectId),
                    },
                    success: res => {
                      console.log('succcess')
                    },
                    

                  })
                }, 100)
              }
              else {

                setTimeout(() => {
                  var join= this.data.join;
                  join.push(app.globalData.collectId)
                  this.setData({
                    join: join,
                  })
                  db.collection('join').add({
                    data: {
                      join: this.data.join,
                    },
                    success: function () {
                      console.log('success')
                    },

                  })
                }, 100)
              }
            }
          })
        }, 200 )
        this.search(firstId)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'join fail',
        })
      }
    })
    
  },
  onInput:function(){
    this.setData({
      hiddeninput: !this.data.hiddeninput
    })
  },
  inputHandler: function (e) {
    this.setData({
      commentTxt: e.detail.value
    })
  },
  onComment:function(){
    this.setData({
      hiddeninput: !this.data.hiddeninput
    })
    const db = wx.cloud.database()
    const _ = db.command
    const util = require('../../util/util.js');
    let d = new Date(), data = {};
    var arr=this.data.arr;
      data = {
        avatar: app.globalData.userInfo.avatarUrl,
        comment: this.data.commentTxt,
        username:app.globalData.userInfo.nickName,
        time: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
        openid:app.globalData.openid,    
      }
      arr.push(data)
      wx.cloud.callFunction({
        name: 'comment',
        data: {
          comment: arr,
          firstId:firstId,
        },
        success: res => {
          wx.showToast({
            title: 'success',
          })
          this.search(firstId)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: 'fail',
          })
        }
      })
  },
  ifcollected:function(){
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('collect').where({
        _openid: app.globalData.openid
      }).get({
        success: res => {
          if (res.data && res.data.length > 0) {
            console.log(res.data[0].collected)
            console.log(app.globalData.collectId)
            for (var i = 0; i < res.data[0].collected.length; i++) {
              if (res.data[0].collected[i] == app.globalData.collectId) {
                  this.setData({
                    collectIc: '../../images/collect.png'
                  })
                  return;
              }
            }
          }
        }
      })
  },
})