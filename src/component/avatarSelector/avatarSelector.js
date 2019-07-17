import React,{ Component } from 'react';
import { Grid,List } from 'antd-mobile';
class AvatarSelector extends Component{
    constructor(props)
    {
        super(props);
        this.state={};
    }
    render()
    {
        const avatarList = "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra"
            .split(',')
            .map(v=>({
                icon:require(`../../img/${v}.png`),
                text:v
            }));
        const gridHeader = this.state.icon
            ?<div>
                <span style={{verticalAlign:'middle'}} >已选择头像</span>
                <img src={this.state.icon} style={{width:20,verticalAlign:'middle'}} alt='头像'/>
            </div>
            :<div>请选择头像</div>
        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5}
                        onClick ={ele=>{
                            this.setState(ele);
                            this.props.selectAvatar(ele.text);
                        }
                    }
                    />
                </List>
            </div>
        )
    }
}
export default AvatarSelector;