import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Landing = ({isAuthenticated})=>{
    if(isAuthenticated)
    {
        return <Redirect to="/dashboard" />
    }
    return (
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Task Reminder</h1>
                    <p className="lead">
                        Create a Task and set reminder, Now never miss anything!!
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
    );
};

Landing.propTypes = {
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);