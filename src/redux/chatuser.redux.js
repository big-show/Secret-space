import axios from 'axios';

//action
const USER_LIST = 'chatusrt/userlist';

//reducer
const defaultState={
    userList:[],
}
export default function chatuser(state=defaultState,action)
{
    switch (action.type)
    {
        case USER_LIST:
            return {...state,userList:action.data};
        default:
            return state;
    }
}

//actionCreator
function getUserList(data)
{
    return {type:USER_LIST,data:data}
}

export function getInitUserList(type)
{
    return dispatch=>{
        axios.get(`/user/list?type=${type}`)
            .then(res=>{
                if(res.data.code===0) {
                    dispatch(getUserList(res.data.data))
                }
            })
    }
}

