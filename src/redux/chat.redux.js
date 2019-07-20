import axios from 'axios';
import io from 'socket.io-client';
//const WS_HOST = 'https://job.lbsmallant.org.cn';
//const socket = io(`${WS_HOST}`);
//线上调试
//const socket = io('ws://47.112.15.88:8084');

//本地调试
const socket = io('ws://localhost:8084');

//action
//获取聊天列表
const MSG_LIST='msg_list';
//读取信息
const MSG_RECV='msg_recv';
//更新未读消息:
const UPDATE_UNREAD = 'UPDATE_unread';
//reducer
const defaultState={
    chatmsg:[],
    unread:0,
    users:{},
};

export default function chat(state=defaultState,action) {
    switch (action.type)
    {
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read&&action.userid===v.to).length,users:action.users};
        case MSG_RECV:
            //console.log(action.payload.to);
            let n=0;
            let isDup = state.chatmsg.every((v)=>(v._id!==action.payload._id));
            if(isDup&&action.userid===action.payload.to)
                 n = 1;
            //console.log("unread++++++",1);
            const setChatMsg = new Set(state.chatmsg);
            state.chatmsg = Array.from(setChatMsg);
            //console.log("chat message:-----------",state.chatmsg);
            //if(state.chatmsg.find())
            //console.log('unread+++++',state.unread+n);
            //console.log(n);
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n};
        case UPDATE_UNREAD:
            return {...state,chatmsg:state.chatmsg.map(v=>{
                       if(v.from===action.from&&action.userid===v.to)
                       {
                           v.read=true;
                       }
                       return v;
                }),unread:state.unread-action.readNum};
        default:
            return state;
    }
}
//actionCreator
function msgList(msgs,users,userid)
{
    return{type:MSG_LIST,payload:msgs,users,userid}
}
function getRecvMsg(msg,userid)
{
    return {type:MSG_RECV,payload:msg,userid}
}
function getUnread(userid,from,readNum)
{
    //console.log("getUnread");
    return {type:UPDATE_UNREAD,userid,from,readNum}
}
export function recvMsg()
{
    //console.log("接受数据");
    return (dispatch,getState)=> {
        socket.on('recvmsg', function (data) {
            console.log("recvmsg返回的数据----",data);
            const userid=getState().user._id;
            dispatch(getRecvMsg(data,userid));
        })
    }
}
//更新未读消息
export function upDateUnread(from)
{
    return (dispatch,getState)=>{
        const userid=getState().user._id;
        //console.log("页面用户:",userid);
        axios.post('/user/updateUnread',{userid,from})
            .then(res=>{
                if(res.status===200&&res.data.code===0)
                    dispatch(getUnread(userid,from,res.data.num))
            })
    }
}
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg})
    }
}
export function getMsgList() {
    console.log("已加载页面通过getMsgList初始化数据列表");
    return (dispatch,getState)=>{

        axios.get('/user/getmsglist')
            .then(res => {
                //console.log(getState());
                //console.log("state",getState());
                const userid=getState().user._id;
                //console.log("用户发起者",userid);
                if (res.status === 200 && res.data.code === 0) {
                    console.log("初始化数据列表成功返回数据:", res.data.msgs, res.data.users, userid);
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
                else
                {
                    console.log("初始化列表失败未能返回与用户有关的数据");
                }
            })
    }
}