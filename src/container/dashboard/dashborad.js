import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Route ,Redirect} from "react-router-dom";
import QueueAnim from 'rc-queue-anim';
import {NavBar} from  'antd-mobile';
import NavLinkBar from '../../component/navlink/nablink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import {getMsgList,recvMsg} from '../../redux/chat.redux';
@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends Component{
    componentDidMount()
    {
        if(!this.props.chat.chatmsg.length) {
            this.props.recvMsg();
        }
        this.props.getMsgList();
        //console.log("DashBorad DidMount");
        //this.pageReload();
    }
    pageReload()
    {
        setTimeout(function(){
            window.location.reload();
        },0)
    }
    render()
    {
        const pageLocation = this.props.location;
        //console.log(pageLocation);
        const navList = [
            {
                path:'/boss',
                text:'Secret',
                icon:'boss',
                title:'联系人',
                component:Boss,
                hide:this.props.user.type==='genius'
            },
            {
                path:'/genius',
                text:'Secret',
                icon:'job',
                title:'联系人',
                component:Genius,
                hide:this.props.user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            },

        ];
        const pageToShow = navList.find((v)=>(v.path===pageLocation.pathname));
        //console.log(pageToShow);
        return pageToShow?(
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path===this.props.location.pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <QueueAnim type='left' duration='450'>
                        <Route key={pageToShow.path} path={pageToShow.path} component={pageToShow.component}/>
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ):<Redirect to='/msg'></Redirect>
    }
}

export default Dashboard;