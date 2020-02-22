import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({isAuthenticated,loading,logout})=>{
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                Users</Link>  
            </li>
            <li>
                <Link to='/tasks'>
                Tasks</Link>  
            </li>
            <li>
                <Link to='/dashboard'>
                Dashboard</Link>
            </li>
            <li>
                <Link onClick={logout} to="/">
                Logout</Link>
            </li>
        </ul>
    );
    const guestLinks = ( 
        <ul>
            <li><Link to="/profiles">Users</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
      
    return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-sticky-note"></i> TaskReminder</Link>
                </h1>
                <Fragment>{(!loading && isAuthenticated)?authLinks:guestLinks}</Fragment>
            </nav>
    )
}


Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loaded: PropTypes.bool
}


const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
});


export default connect(mapStateToProps,{logout})(Navbar); 