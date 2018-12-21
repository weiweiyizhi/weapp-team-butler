# 组队小管家
帮助有组队需求却找不到有相应技能的队友的小伙伴
## 开发模式：小程序云开发

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221203852949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)云开发使得开发更为简单，不用买服务器。

## 前期UI设计：

共35张设计原稿（https://pan.baidu.com/s/1LXtfoFguQ2uuxEx-qPs0CA 提取码：fnjv ）

 如图例子：
 
![原稿例子](https://img-blog.csdnimg.cn/20181221195839637.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

## 开发结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221200138415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221200224987.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221200300432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

## 开发指南
**1.准备工作**

 - 首先，申请账号：点击 https://mp.weixin.qq.com/wxopen/waregister?action=step1
   填写资料，就可以拥有自己的小程序帐号。
   
 - 登录 https://mp.weixin.qq.com ，在菜单 “设置”-“开发设置” 看到小程序的 AppID 
 - 下载微信web开发者工具


**2.开始旅程**

 - 克隆整个项目
 - 打开开发者工具，新建小程序项目，浏览到组队小管家目录下 填写你的AppID

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221203510334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

 - 打开项目后，点击云开发管理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221203710219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

 - 在数据库添加如下5个集合

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221204206268.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

 - 将3个云函数上传部署
 - ![在这里插入图片描述](https://img-blog.csdnimg.cn/20181221204514341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzQ2MTIy,size_16,color_FFFFFF,t_70)

现在就可以运行啦
