import React, {useState,Fragment} from 'react';
import moment from 'moment';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import {updateTask} from '../../actions/task';


const EditTask = ({updateTask,Task:{task,loading},history}) =>{
    const [formData,setFormData] = useState({
        description:'',
        due_at:'',
        toBeReminded:''
    });
    
    const onSubmit = e=>{
        e.preventDefault();
        updateTask(task._id,formData,history);
    }

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
                <input type="text" placeholder="Task Description" name="description" value={description} onChange={e=> onChange(e)}/>
                <small className="form-text">Task Description</small>
                </div>    
                <div className="form-group">
                    <label htmlFor="due_date">Due Date for Task:</label><br></br>
                    <DatePicker minDate={addDays(new Date(), 1)} id="due_date" name="due_at" value={due_at} onChange={(date)=> onChangeDate(date)} />
                </div>
                <div className="form-group">
                    <label htmlFor="reminder">Set Reminder:</label><br></br>
                    <input type="radio" id="yes" name="toBeReminded"  value="true" onClick={e=> onChange(e)}/>
                    <label htmlFor="yes">Yes</label><br/>
                    <input type="radio" id="no" name="toBeReminded" value="false" onClick={e=> onChange(e)}/>
                    <label htmlFor="no">No</label><br/>  
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/tasks">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditTask.propTypes = {
    updateTask:PropTypes.func.isRequired,
    Task:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Task:state.task
});


export default connect(mapStateToProps,{updateTask})(withRouter(EditTask));