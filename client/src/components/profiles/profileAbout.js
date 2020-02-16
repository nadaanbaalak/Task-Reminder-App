import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile:{
        bio,
        user:{
            name
        }
    }
})=>{
    return (
        <div class="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 class="text-primary">{name}'s Bio</h2>
                    <p>
                        {bio}
                    </p>
                </Fragment>
            )}
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout;