import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_TASK,
    GET_TASKS,
    TASK_ERROR,
    UPDATE_TASK,
    DELETE_TASK
} from './types';

//get a single task by id
export const getTaskById = (taskId) =>async dispatch =>{
    try {
        const res = await axios.get(`/api/tasks/${taskId}`);
        dispatch({
            type:GET_TASK,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:TASK_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
}

//Get Tasks
export const getTasks = () => async dispatch =>{
    try {
        const res = await axios.get('/api/tasks')
        dispatch({
            type:GET_TASKS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:TASK_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
}


//Update Task
export const updateTask = (taskId,formData,history) => async dispatch =>{
    try {
        const res = await axios.patch(`/api/tasks/${taskId}`,formData)
        dispatch({
            type:UPDATE_TASK,
            payload:res.data
        })
        dispatch(setAlert('Task Updated','success'));
        history.push("/tasks"); //can't use redirect in an action
    } catch (error) {
        dispatch({
            type:TASK_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
}


//Delete Task
export const deleteTask = taskId => async dispatch=>{
    try {
        console.log('1');
        await axios.delete(`/api/tasks/${taskId}`);
        console.log('2');
        dispatch({
            type:DELETE_TASK,
            payload:taskId
        });
        dispatch(setAlert('Task Removed','success'));
    } catch (error) {
        console.log('Inside catch')
        dispatch({
            type:TASK_ERROR,
            payload:{msg: error.response.statusText, status: error.response.status }
        });
    }
}
