import React, {useState,Fragment,useEffect} from 'react';
import moment from 'moment';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import {updateTask,getTaskById} from '../../actions/task';


const EditTask = ({updateTask,getTaskById,Task:{task,loading},history,match}) =>{
    console.log(`${task} From inside task update`)
    const [formData,setFormData] = useState({
        description:'',
        due_at:'',
        toBeReminded:'',
        completed:''
    });
    
    
    const onSubmit = e=>{
        e.preventDefault();
        updateTask(task._id,formData,history);
    }
//     useEffect(()=>{
//         console.log(` Inside useEffect`);// useEffect(()=>{
//         //console.log(`${task} Inside useEffect`);
//         getTaskById(match.params.id);
// //         return ()=>{
// // // 
// //         }
        
//         setFormData({
//             description: loading || !task.description?'':task.description
//             //due_at: loading || !task.due_at?'':task.due_at      
//         })//,loading,task.description  match.params.id,getTaskById
//     },[match.params.id,getTaskById,loading,task.description])
    //     //getTaskById(match.params.id);

    //     // setFormData({
    //     //     description: loading || !task.description?'':task.description
    //     //     //due_at: loading || !task.due_at?'':task.due_at      
    //     // })//,loading,task.description
    // },[match.params.id,getTaskById])


    const onChange = e=>setFormData({...formData, [e.target.name]:e.target.value})
    const onChangeDate = (date) => {
        setFormData({...formData, due_at: moment(date).format("MM-DD-YYYY")})
    }

    const {description,due_at} = formData;
    
    return (
        <Fragment>
            <h1 className="large text-primary">
                Edit Task
            </h1>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                <label htmlFor="descr">Description:</label><br/>
                <input type="text" placeholder="Task Description" name="description" value={description} onChange={e=> onChange(e)}/>
                <small className="form-text">Task Description</small>
                </div>    
                <div className="form-group">
                    <label htmlFor="due_date">Due Date for Task:</label><br></br>
                    <DatePicker minDate={addDays(new Date(), 1)} id="due_date" name="due_at" value={due_at} onChange={(date)=> onChangeDate(date)} />
                </div>
                <div className="form-group">
                    <label>Set Reminder:</label><br></br>
                    <input type="radio" id="yesR" name="toBeReminded"  value="true" onClick={e=> onChange(e)}/>
                    <label htmlFor="yesR">Yes</label><br/>
                    <input type="radio" id="noR" name="toBeReminded" value="false" onClick={e=> onChange(e)}/>
                    <label htmlFor="noR">No</label><br/>  
                </div>
                <div className="form-group">
                    <label>Status:</label><br></br>
                    <input type="radio" id="yes" name="completed"  value="true" onClick={e=> onChange(e)}/>
                    <label htmlFor="yes">Completed</label><br/>
                    <input type="radio" id="no" name="completed" value="false" onClick={e=> onChange(e)}/>
                    <label htmlFor="no">Pending</label><br/>  
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/tasks">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditTask.propTypes = {
    updateTask:PropTypes.func.isRequired,
    getTaskById:PropTypes.func.isRequired,
    Task:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Task:state.task
});


export default connect(mapStateToProps,{updateTask,getTaskById})(withRouter(EditTask));