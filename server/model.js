const mongoose = require('mongoose');
let env = process.env.NODE_ENV||'development';
let dbUrl ='';
//console.log("env",env);
//部署到线上
dbUrl='mongodb://smallant:11111$@127.0.0.1:27017/SecretSpace';
if(env === 'development')
{
    dbUrl='mongodb://localhost:27017/SecretSpace';
}
//console.log(dbUrl);
//alert(dbUrl);
mongoose.connect(dbUrl);

const models = {
    user:{
        'user':{type:String,'require':true},
        'pwd':{type:String,'require':true},
        'type':{type:String,'require':true},
        //头像
        'avatar':{type:String},
        //简介
        'desc':{type:String},
        //职位
        'title':{type:String},
        //boss页面的公司和薪酬
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,require:true},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:new Date().getTime()}
    }

};
for(let m in models)
{
    mongoose.model(m,new mongoose.Schema(models[m]));
}
module.exports = {
    getModel:function (name) {
        return mongoose.model(name);
    }
}