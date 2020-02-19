import React from 'react';
import {Link} from 'react-router-dom';


const ProfileItem = ({profile:{
    user:{_id,name,avatar},
    location
}})=>{
    return <div className="profile bg-light">
        <div>
            <h2>{name}</h2>
            <p className="my-1"> {location&&<span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className='btn btn-primary'>View User Profile</Link>
        </div>
    </div>
}


export default ProfileItem;