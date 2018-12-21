// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var member=event.member, firstId = event.firstId;
  try {return await db.collection('issue').where({
      _id:firstId
  })
      .update({
        data: {
          member:_.push(member),
        },
        success: res => {
          console.log('云函数join')
        },
        fail: e => {
          console.error(e)
        }
      })
  }
      catch(e){
      console.error(e)
      }

}