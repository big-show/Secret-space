const utils = require('utility');
const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter={pwd:0};
Router.get('/list',(req,res)=>{
  // User.remove({},(e,d)=>{});
   // Chat.remove({},(e,d)=>{});

    const {type} = req.query;
   User.find({type},(err,doc)=>{
      res.json({code:0,data:doc});
   })
});
//初始化chat信息列表
Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid ;
    //console.log(req.query);
    //console.log("cookies用户发起者id",user);
    //查询用户姓名和头像
    let users={};
    User.find({},function (e,userdoc) {
       //console.log("数据库中的user",userdoc)
       userdoc.forEach((v)=>{
           users[v.id]={name:v.user,avatar:v.avatar}
       })
       console.log("所有用户",users);
    });
    Chat.find({"$or":[{from:user},{to:user}]},function (err,doc) {
        if(err)
            return res.josn({code:1,msg:'后端出错'});
        console.log("该用户的所有对话:",doc);
        return res.json({code:0,msgs:doc,users:users})
    })
});
//更新未读消息列表
Router.post('/updateUnread',function(req,res){
    //通过GetState传过来的Userid和cookies.userid是一致的
   //const cookieUserid = req.cookies.userid;
   const userid = req.body.userid;
   const from = req.body.from;
   // console.log("cookies",req.cookies);
   // console.log("cookies userid",cookieUserid);
   // console.log("通过getState获取到的userid",userid);


    //console.log("From who",from);
   //console.log(req.body);
   Chat.update({from,to:userid},{$set: {read:"true"}}, {multi: true},(err,doc)=>{
       //console.log(doc.nModified);
      if(!err)
          return res.json({code:0,num:doc.nModified});
      else
        return res.json({code:1,msg:"更新错误"});

   });
});
Router.post('/login',function (req,res) {
    const{user,pwd} = req.body;
    //console.log(user,pwd);
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>
    {
        if(!doc) {
            return res.json({code: 1, msg: "用户名或密码错误"});
        }
            res.cookie("userid",doc._id);
            return res.json({code:0,data:doc});
    })
});
Router.post('/register',function (req,res) {
  const {user,pwd,type} = req.body;
  User.findOne({user},function (err,doc) {
      if(doc)
          return res.json({code:1,msg:"用户名已被注册，请重新填写一个"});
      const userModel = new User({user,pwd:md5Pwd(pwd),type});
      userModel.save(function(e,d){
         const {user,type,_id} =d;
         //console.log("新用户的信息",d);
         res.cookie('userid',_id);
         return res.json({code:0,data:d});
      });
  })

});
//处理bossinfo更新信息
Router.post('/update',function (req,res) {
    //console.log(req.body);
    const userid=req.cookies.userid;
    if(!userid)
        return res.json({code:1});
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
      const data = Object.assign({},{
          user:doc.user,
          type:doc.type,
      },req.body);
      return res.json({code:0,data});
    });
});
Router.get('/info',(req,res)=>{
   const {userid} = req.cookies;
   //console.log(userid);
   if(!userid)
       return res.json({code:1});
   User.findOne({_id:userid},_filter,function(err,doc){
       if(err)
       {
           return res.json({code:1,msg:"后端出现错误"})
       }
       if(doc)
       {
           console.log("登录用户信息:",doc);
           return res.json({code:0,data:doc});
       }
    })
});
function md5Pwd(pwd)
{
    const salt = 'lb_232323_dsdfasd!@#!#!#$#!_';
    return utils.md5(utils.md5(pwd+salt));
}
module.exports = Router;