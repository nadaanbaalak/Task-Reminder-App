import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccountAndProfile
} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardEdit from "./DashboardEdit";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccountAndProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Welcome, {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
          <DashboardEdit />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => deleteAccountAndProfile()}
            >
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Please tell us more about yourself</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            {" "}
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccountAndProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccountAndProfile
})(Dashboard);
