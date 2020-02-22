import axios from 'axios'; //not for making request here but for setting header

const setAuthToken = token =>{
    if(token)
    {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;