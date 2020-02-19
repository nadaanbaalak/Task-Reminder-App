import React, {Fragment,useState,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 
import {addTask} from '../../actions/task';
import { addDays } from 'date-fns';
import moment from 'moment';



const TaskForm = ({addTask}) =>{
    const [formData,setFormData] = useState({
        description:'',
        due_at:'',
        toBeReminded:''
    })
    const onSubmit = e=>{
        e.preventDefault();
        addTask(formData);
    }
    const onChange = e=> setFormData({...formData, [e.target.name]:e.target.value})
    const onChangeDate = (date) => {
       setFormData({...formData, due_at: moment(date).format("MM-DD-YYYY")})
        //console.log('date : ',date )
    }
    const {description,due_at} = formData;


    return (
        <Fragment>
            <h1 className="large text-primary">
                New Task
            </h1>
            <form className="form my-1" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="descr">Description:</label><br/>
                    <input type="text" id="descr" placeholder="Task Description" name="description" value={description} onChange={e=> onChange(e)}/>
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
                    <label htmlFor="no">No</label><br></br> 
                    
                    
                </div>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                <Link className="btn btn-light my-1" to="/tasks">Go Back</Link>
            </form>
        </Fragment>
    )
}

TaskForm.propTypes = {
    addTask:PropTypes.func.isRequired
}

export default connect(null,{addTask})(TaskForm); 
/*
<input type='date' name="due_at" value={due_at} onChange={e=> onChange(e)}/>

<DatePicker id="due_date" minDate={addDays(new Date(), 1)} id="due_date" name="due_at" value={due_at} onChange={e=> onChange(e)} />
*/