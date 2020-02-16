import React from 'react';
import {Link} from 'react-router-dom';

const DashboardEdit = () =>{
    return (
        <div class="dash-buttons">
            <Link to="/edit-profile" class="btn btn-light">Edit Profile</Link>
        </div>
    )
}

export default DashboardEdit; 