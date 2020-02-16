import React, {useState,Fragment,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateTask} from '../../actions/task';


const EditTask = ({updateTask,Task:{task,loading},history}) =>{
    const [formData,setFormData] = useState({
        description:''
    });
    const {description} = formData;

    const onSubmit = e=>{
        e.preventDefault();
        updateTask(task._id,formData,history);
    }

    const onChange = e=>setFormData({...formData, [e.target.name]:e.target.value})

    // useEffect(()=>{
    //     setFormData({
    //         description:loading||!task.description?'':task.description
    //     })
    // },[]);


    
    return (
        <Fragment>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Task Description" name="description" value={description} onChange={e=> onChange(e)}/>
                <small className="form-text">Task Description</small>
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