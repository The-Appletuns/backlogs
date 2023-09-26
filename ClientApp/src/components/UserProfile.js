import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import PersonIcon from '@mui/icons-material/Person'


export class UserProfile extends Component {
    static displayName = UserProfile.name;

    render() {
        return (
            <Box>
                <Stack direction="row" alignItems={'baseline'}>
                    <Stack direction="row">
                        <PersonIcon/>
                        <h1>Username</h1>
                    </Stack>
                    <Stack 
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={2}>
                        <Box>
                            <h2>##</h2>
                            <h2>Games</h2>
                        </Box>
                        <Box>
                            <h2>##</h2>
                            <h2>Following</h2>
                        </Box>
                        <Box>
                            <h2>##</h2>
                            <h2>Followers</h2>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        )
    }
}