import React,{Component} from 'react';
import {connect} from 'react-redux'
import {getInitUserList} from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";
import {getMsgList} from "../../redux/chat.redux";
@connect(
    state=>state.chatuser,
    {getInitUserList,getMsgList}
)
class Genius extends Component{


    componentDidMount()
    {
        this.props.getInitUserList('boss');
        this.props.getMsgList();
        console.log("Genius DidMount");
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
export default Genius;