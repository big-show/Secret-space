import React,{ Component } from 'react';
import logoImg from './logo.png';
import './logo.css';
class logo extends Component{

    render()
    {
        return(
            <div className='logo-container'>
                <img src={logoImg} alt=''/>
            </div>
        )
    }
}
export default logo;