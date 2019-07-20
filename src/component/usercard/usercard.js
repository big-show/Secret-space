import React ,{ Component }  from 'react';
import {WhiteSpace,Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends Component{

    handleClick(v)
    {
        this.props.history.push(`/chat/${v._id}`);
    }
    render()
    {
        return (
            <div>
                <WhiteSpace/>
                {this.props.userList.map(v=>(
                    v.avatar?<Card full key={v._id} onClick={()=>this.handleClick(v)}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../../img/${v.avatar}.png`)}
                            //extra={v.title}
                        />
                        <Card.Body>
                            <div>所在城市:{v.company}</div>
                            <div>兴趣爱好:{v.money}</div>
                            <div>个人简介:{v.desc}</div>

                        </Card.Body>
                    </Card>:null
                ))}
            </div>
        )
    }
}
export default UserCard;