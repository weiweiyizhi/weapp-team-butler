// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var comment = event.comment, firstId = event.firstId;
  try {
    return await db.collection('issue').where({
      _id: firstId
    }).update({
      data: {
        comment: _.push(comment),
      },
        success: res => {
          console.log('云函数comment成功')
        },
        fail: e => {
          console.error(e)
        }
      })
  } catch (e) {
    console.error(e)
  }
}