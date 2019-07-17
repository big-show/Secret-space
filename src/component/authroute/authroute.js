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
class AuthRoute extends Component{

    componentDidMount()
    {
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)!==-1)
        {
            return null;
        }
        axios.get('/user/info').then(res=>{
                if(res.status===200)
                {
                    if(res.data.code===0) {
                        //console.log(res.data.data);
                        this.props.loadDataSucc(res.data.data);
                    }
                    else {
                        this.props.history.push('/login');
                    }
                }
            });
    }
    render()
    {
        return null;
    }
}
export default AuthRoute;