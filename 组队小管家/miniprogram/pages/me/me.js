const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    top:'',
    bottom:''
  },



  myInf: function () {
    wx.navigateTo({
      url: '../myInf/myInf',
    })
  },




  onLoad: function () {
    if (!wx.getStorageSync('top')){
    wx.setStorageSync('top','https://6131-a17766476112-b1d334-1257968635.tcb.qcloud.la/me/Individual Info.jpg?sign=7f7e4c99da43cb2f9a3f69baca707334&t=1541988206')
    }
    if (!wx.getStorageSync('tottom')) {
    wx.setStorageSync('bottom', 'https://6131-a17766476112-b1d334-1257968635.tcb.qcloud.la/me/Work Collection.jpg?sign=7bbe75c96443d35e99d8f423cffdc88b&t=1541988241')
    }
    var top=wx.getStorageSync('top') ,bottom=wx.getStorageSync('bottom');
   this.setData({
     avatarUrl:app.globalData.userInfo.avatarUrl,
     top:top,
     bottom:bottom,
   })       
  },


})