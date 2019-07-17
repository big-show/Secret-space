const express = require('express');
const userRouter = require('./user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const model = require('./model');
const Chat = model.getModel('chat');
//socket work with express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//Chat.remove({},(e,d)=>{});
io.on('connection',function (socket) {
    socket.on('sendMsg',function (data) {
        //console.log(data);
        ///io.emit('recvmsg',data)
        const {from,to,msg}=data;
        const chatid =[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            //console.log(""doc._doc);
            io.emit('recvmsg',Object.assign({},doc._doc));
        });
    })
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);
//设置静态资源地址,白名单
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/'))
        return next();
    else
        return res.sendFile(path.resolve('build/index.html'));
});
app.use('/',express.static(path.resolve('build')));

server.listen(8083,"0.0.0.0",()=>{
   console.log('server started at 8083')
});