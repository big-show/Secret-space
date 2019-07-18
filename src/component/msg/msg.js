import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
import {getMsgList} from "../../redux/chat.redux";
//import Login from "../../container/login/login";
@connect(
    state=>state,
    {getMsgList}
)
class Msg extends Component{
    componentDidMount()
    {

        //console.log("Msg DidMount");
        this.props.getMsgList();

    }
    getListItem(arr)
    {
        return arr[arr.length-1];
    }
    render()
    {
        const Item = List.Item;
        const Brief = Item.Brief;
        const chatGroup={};
        //去除两次点击效果
        const setChatMsg = new Set(this.props.chat.chatmsg);
        this.props.chat.chatmsg = Array.from(setChatMsg);
        this.props.chat.chatmsg.forEach(v=>{
            chatGroup[v.chatid]=chatGroup[v.chatid]||[];
            chatGroup[v.chatid].push(v);
        });
        let chatGroupValue = Object.values(chatGroup).sort((a,b)=>
        {
            const aLast = this.getListItem(a).create_time;
            const bLast = this.getListItem(b).create_time;
            return bLast-aLast;
        });
        let setChatGroup = new Set(chatGroupValue);
        chatGroupValue = Array.from(setChatGroup);
        console.log("为与该用户有关的对话进行分组:",chatGroupValue);
        const userid=this.props.user._id;
        //console.log("当前用户userid",userid);
        return (
            <div>
                {chatGroupValue.map(v=>{
                    const unreadNum=v.filter(v=>!v.read&&v.to===userid).length;
                    //
                    const targetId=(userid===v[0].to)?v[0].from:v[0].to;
                    const userinfo=this.props.chat.users;
                    //console.log("所有会话者:",userinfo);
                    //console.log("targetIDIDIDIDIDID-----------",targetId);
                    if(!userinfo[targetId])
                        return null;
                    const name=userinfo[targetId].name;
                    const avatar = userinfo[targetId].avatar;
                    const msg=this.getListItem(v);
                    //console.log(msg.content);
                    return(
                        <List key={msg._id}>
                            <Item key={v._id}
                                thumb={<img src={require(`../../img/${avatar}.png`)} alt='头像'/>}
                                  extra={<Badge text={unreadNum}></Badge>}
                                  arrow='horizontal'
                                  onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            >
                                {msg.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>
                    )
                }
                )
                }

            </div>
        )
    }
}
export default Msg;