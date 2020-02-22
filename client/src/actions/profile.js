import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    DELETE_ACCOUNT,
    CLEAR_PROFILE
} from './types';

//Get current user's Profile
export const getCurrentProfile = ()=> async dispatch=>{
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
    } catch(error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
};


//Get all Profiles
export const getProfiles = ()=> async dispatch=>{
    dispatch({type:CLEAR_PROFILE});
    try{
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload: res.data
        });
    } catch(error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
};


//Get Profile by id
export const getProfileById = userId => async dispatch=>{
    try{
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    } catch(error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
};



//create or update Profile
export const createProfile = (formData,history,edit=false) =>async dispatch=>{
    try {
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData,config);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit?'Profile Updated':'Profile created','success'));
        if(!edit){
            history.push("/dashboard"); //can't use redirrect in an action
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error)=>dispatch(setAlert(error.msg,'danger')));
        } 
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Delete profile and account
export const deleteAccountAndProfile = () => async dispatch =>{
    if(window.confirm(`Are you sure? This can't be undone!`))
    {
        try{
            await axios.delete('/api/profile');
            dispatch({
                type:CLEAR_PROFILE
            })
            dispatch({
                type:DELETE_ACCOUNT
            })
            dispatch(setAlert('Your account is deleted'))
        } catch(error){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: error.response.statusText, status: error.response.status }
            })
        }
    }
    
}