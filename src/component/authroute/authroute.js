import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadDataSucc } from '../../redux/user.redux';
import { connect } from 'react-redux';
import axios from 'axios';
@withRouter
@connect(
    null,
    {loadDataSucc}
)
class AuthRoute extends Component {
    componentWillMount(){
        console.log("即将加载到AuthRoute权限鉴定页面")
    }
    componentDidMount() {
        const publicList = ['/login', '/register'];
        //console.log(this.props);
        const pathname = this.props.location.pathname;
        console.log(pathname);
        if (publicList.indexOf(pathname) !== -1) {
            return null;
        }
        //得到登录用户的cookies信息，检测是否有已存在的cookie值
        axios.get('/user/info').then(res => {
            console.log("通过AuthRoute权限鉴定页面，检测该用户是否存在登录cookie记录，是否能从后台查到user信息");
            if (res.status === 200) {
                if (res.data.code === 0) {
                    console.log("该用户存在登录cookie记录，从后台查到user信息", res.data.data);
                    //console.log(res.data.data);
                    this.props.loadDataSucc(res.data.data);
                }
                else {
                    this.props.history.push('/login');
                }
            }
        });
        console.log("完成加载到AuthRoute权限鉴定页面")
    }
    render()
    {
        return null;
    }
}
export default AuthRoute;