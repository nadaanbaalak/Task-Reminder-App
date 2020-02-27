import React, { useState, Fragment, useEffect } from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { updateTask, getTaskById } from "../../actions/task";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      due_at: "",
      toBeReminded: "",
      completed: ""
    };
  }

  componentWillMount() {
    this.props.getTaskById(this.props.match.params.id);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        description: this.props.Task.task.description,
        due_at: moment(this.props.Task.task.due_at).format("MM-DD-YYYY"),
        completed: this.props.Task.task.completed,
        toBeReminded: this.props.Task.task.toBeReminded
      });
    }, 300);
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.updateTask(this.props.Task.task._id, this.state);
    this.setState({ description: "", due_at: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeDate = date => {
    this.setState({ due_at: moment(date).format("MM-DD-YYYY") });
  };

  render() {
    return (
      <Fragment>
        <h1 className="large text-primary">Edit Task</h1>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="descr">Description:</label>
            <br />
            <input
              type="text"
              placeholder="Task Description"
              name="description"
              value={this.state.description}
              onChange={e => this.onChange(e)}
            />
            <small className="form-text">Task Description</small>
          </div>
          <div className="form-group">
            <label htmlFor="due_date">Due Date for Task:</label>
            <br></br>
            <DatePicker
              minDate={addDays(new Date(), 1)}
              id="due_date"
              name="due_at"
              value={this.state.due_at}
              onChange={date => this.onChangeDate(date)}
            />
          </div>
          <div className="form-group">
            <label>Set Reminder:</label>
            <br></br>
            <input
              type="radio"
              id="yesR"
              name="toBeReminded"
              value="true"
              onClick={e => this.onChange(e)}
            />
            <label htmlFor="yesR">Yes</label>
            <br />
            <input
              type="radio"
              id="noR"
              name="toBeReminded"
              value="false"
              onClick={e => this.onChange(e)}
            />
            <label htmlFor="noR">No</label>
            <br />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <br></br>
            <input
              type="radio"
              id="yes"
              name="completed"
              value="true"
              onClick={e => this.onChange(e)}
            />
            <label htmlFor="yes">Completed</label>
            <br />
            <input
              type="radio"
              id="no"
              name="completed"
              value="false"
              onClick={e => this.onChange(e)}
            />
            <label htmlFor="no">Pending</label>
            <br />
          </div>
          <div>
            <small>
              *Reminder won't be send if task status is set as <b>Completed</b>
            </small>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/tasks">
            Go Back
          </Link>
        </form>
      </Fragment>
    );
  }
}

EditTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
  getTaskById: PropTypes.func.isRequired,
  Task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  Task: state.task
});

export default connect(mapStateToProps, { updateTask, getTaskById })(
  withRouter(EditTask)
);
