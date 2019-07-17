import React ,{ Component } from 'react';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import './css/index.css'
//import Logo from '../../component/logo/logo';
import backGround from '../../img/timg.jpg';
import { Redirect } from 'react-router-dom';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
@connect(
    state=>state.user,
    {login}
)
class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          user:"",
          pwd:"",
        };
        this.register=this.register.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    register()
    {
        this.props.history.push('/register')
    }
    handleInputChange(type,val)
    {
        this.setState({
            [type]:val
        })
    }
    handleClick()
    {
        this.props.login(this.state);
    }
    render()
    {
        return(
            <div>
            <div className='background'>
                <div className="inputItem">
                {this.props.redirecTo&&this.props.redirecTo!=='/login'?<Redirect to={this.props.redirecTo}/>:null}
                {/*<Logo></Logo>*/}
                {this.props.errMsg?<p className='err_msg'>{this.props.errMsg}</p>:null}
                <WingBlank size='sm'>

                        <InputItem placeholder='账号' onChange={(v)=>{this.handleInputChange('user',v)}}></InputItem>

                        <WhiteSpace/>

                        <InputItem  placeholder='密码' type='password' onChange={(v)=>{this.handleInputChange('pwd',v)}}></InputItem>

                    <WhiteSpace/>

                </WingBlank>
                </div>
                <footer className='login'>
                    <Button
                        className='left'
                        type='primary'
                        onClick={this.handleClick}>
                        登陆
                    </Button>
                    <Button
                        className='right'
                        type='primary'
                        onClick={this.register}>
                        注册
                    </Button>
                </footer>
            </div>
            </div>
        );
    }
}
export default Login;