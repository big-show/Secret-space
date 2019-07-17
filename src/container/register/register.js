import React, {Component} from 'react';
//import Logo from '../../component/logo/logo';
import {Button, InputItem, Radio, WhiteSpace} from 'antd-mobile';
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './css/index.css'

@connect(
    state => state.user,
    {register}
)


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'boss'
        };
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }

    handleInputChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleInputSubmit() {
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <div className='background'>
                    {this.props.redirecTo ? <Redirect to={this.props.redirecTo}/> : null}
                    <div className="inputItem">

                        <WhiteSpace/>
                        {this.props.errMsg ? <p className='err_msg'>{this.props.errMsg}</p> : null}
                        <InputItem onChange={v => this.handleInputChange('user', v)} placeholder="用户"></InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={(v) => this.handleInputChange('pwd', v)}
                                   placeholder="密码"></InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={(v) => this.handleInputChange('repeatPwd', v)}
                                   placeholder="确认密码"></InputItem>
                        <WhiteSpace/>
                        <div className='radioItems'>
                            <RadioItem className="left" checked={this.state.type === "boss"}
                                       onChange={(v) => this.handleInputChange('type', 'boss')}>
                                男孩
                            </RadioItem>
                            <RadioItem className="right" checked={this.state.type === "genius"}
                                       onChange={(v) => this.handleInputChange('type', 'genius')}>
                                女孩
                            </RadioItem>
                        </div>
                    </div>
                    <Button id='register' type='primary' onClick={this.handleInputSubmit}>提交</Button>
                </div>
            </div>
        )
    }
}

export default Register;