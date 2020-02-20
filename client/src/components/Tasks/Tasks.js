import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import TaskItem from './TaskItem';
import {getTasks} from '../../actions/task';

const Tasks = ({getTasks, task:{tasks,loading}}) => {
    useEffect(()=>{
        getTasks();
    },[getTasks]);
    return ( loading ? <Spinner/>:(
        <Fragment>
            <h1 className="large text-primary">Tasks</h1>
            <Link className="btn btn-dark my-1" to="/create-task">Create Task</Link>
            {tasks.length>0?(
                    <Fragment>
                        <div className="tasks">
                            {tasks.map(task=>(
                                <TaskItem key={task._id} task={task}/>
                            ))}
                        </div>
                    </Fragment>):(<h4>No Tasks created!!</h4>)
            }    
        </Fragment>)
        
    )
}

Tasks.propTypes = {
    getTasks:PropTypes.func.isRequired,
    task:PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    task:state.task
});

export default connect(mapStateToProps,{getTasks})(Tasks);