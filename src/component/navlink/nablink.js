import React ,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(
    state=>state
)
class NavLinkBar extends Component{

    render()
    {
        const navList = this.props.data.filter(v=>!v.hide);
        //获取访问地址
        const {pathname} = this.props.location;
        return(
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.chat.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path);
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }

}
export default NavLinkBar;