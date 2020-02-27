import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/task";

const TaskItem = ({
  deleteTask,
  task: { _id, due_at, date, description, completed, toBeReminded }
}) => {
  return (
    <div className="task">
      <p className="my-1">{description}</p>
      <p className="task-date">
        Created on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      <p>
        <b>Due by :</b> <Moment format="DD/MM/YYYY">{due_at}</Moment>
      </p>
      <p>
        <b>Status :</b>
        {completed === true ? "Completed" : "Pending"}
      </p>
      <p>
        <b>Reminder : </b>
        {toBeReminded === true ? "Yes" : "No"}
      </p>
      <div>
        {completed === false ? (
          <Link to={`/edit-task/${_id}`} className="btn btn-primary">
            Update
          </Link>
        ) : (
          <Fragment />
        )}
        <button
          onClick={e => deleteTask(_id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired
  //getTaskById:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteTask })(TaskItem);
