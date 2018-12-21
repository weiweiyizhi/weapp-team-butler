// miniprogram/pages/issue/issue.js
const app = getApp()
  Page({
    data: {
      lists: [{}],
      teamName: '',
      competitionName: '',
      recruitType:[],
      slogan: '',
      detail: '',
      member:[],
      data:{},
      arr:[],
      join:[],
    },
    

    addList: function () {
      var lists = this.data.lists;
      var newData = {};
      lists.push(newData);
      this.setData({
        lists: lists,
      })
    },
    delList: function () {
      var lists = this.data.lists;
      lists.pop();   
      this.setData({
        lists: lists,
      })
    },   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let d = new Date(), data = {};
    var arr = this.data.arr;
    data = {
      avatar: app.globalData.userInfo.avatarUrl,
      username: app.globalData.userInfo.nickName,
      openid: app.globalData.openid,
    }
    arr.push(data)
    var member=this.data.member;
    member.push(app.globalData.openid);
    this.setData({
      member:arr,
    })
    console.log(this.data.member)
  },

 
  getTea: function (e) {
      var val = e.detail.value;
      this.setData({
       teamName: val
      });
  },
    getCom: function (e) {
      var val = e.detail.value;
      this.setData({
        competitionName: val
      });
    },
    
    getRec: function (e) {
      var val = e.detail.value;
      if(val.length>0){
      var recruitType=this.data.recruitType;
      recruitType.push(val);
      this.setData({
        recruitType: recruitType
      });
      console.log(val)
      }
    },
    getSlo: function (e) {
      var val = e.detail.value;
      this.setData({
        slogan: val
      });
    },
    getDet: function (e) {
      var val = e.detail.value;
      this.setData({
        detail: val
      });
    },


onAdd: function () {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('issue').add({
      data: { 
        teamName: this.data.teamName,
        competitionName: this.data.competitionName,
        recruitType:this.data.recruitType,
        slogan:this.data.slogan,
        detail:this.data.detail,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        leaderName:app.globalData.userInfo.nickName,
        member:this.data.member,
      },
      success: res => {
        let collectId1 = res._id;
 
        wx.showToast({
          title: 'success',
        }),
        console.log('fanhuile',res._id)
        setTimeout(() => {
          db.collection('join').where({
            _openid: app.globalData.openid
          }).get({
            success: res => {
              if (res.data && res.data.length > 0) {
                setTimeout(() => {
                  db.collection('join').doc(res.data._id).update({
                    data: {
                      join: _.push(collectId1),
                    },
                    success: res => {
                      console.log('succcess')
                    },


                  })
                }, 100)
              }
              else {

                setTimeout(() => {
                  var join = this.data.join;
                  join.push(collectId1)
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
        }, 1000, )
      },
      fail: err => {
        wx.showToast({
          title: 'fail'
        })
   
      }
    })
  },


})
