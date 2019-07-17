import React,{Component} from 'react';
import {connect} from 'react-redux'
import {getInitUserList} from "../../redux/chatuser.redux";
import {getMsgList} from "../../redux/chat.redux";
import UserCard from '../usercard/usercard';
@connect(
    state=>state.chatuser,
    {getInitUserList,getMsgList}
)
class Boss extends Component{
    componentDidMount()
    {
        this.props.getInitUserList('genius');
        this.props.getMsgList();
        //console.log("Boss DidMount");
    }
    render()
    {
        // console.log(this.props.userList);
        return (
            <div>
                <UserCard userList={this.props.userList}></UserCard>
            </div>
        )
    }
}
export default Boss;