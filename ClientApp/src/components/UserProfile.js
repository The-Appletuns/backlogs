import React, { Component } from 'react';

import Box from '@mui/material/Box';

export class UserProfile extends Component {
    static displayName = UserProfile.name;

    render() {
        return (
            <Box>
                <h1>User Profile</h1>
            </Box>
        )
    }
}