import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';


export class UserProfile extends Component {
    static displayName = UserProfile.name;

    userProfileHeader() {
        // User info at the header

        return (
            <Stack direction="row" alignItems='center' justifyContent='space-between'>
                <Stack 
                    direction="row" 
                    alignItems='center' 
                    justifyContent='space-around'
                    spacing={4}>
                    <PersonIcon fontSize='large'/>
                    <Typography variant='h2'>Username</Typography>
                </Stack>
                <Stack 
                    direction="row"
                    alignItems='center'
                    divider={<Divider orientation="vertical" flexItem/>}
                    spacing={2}>
                    <Box>
                        <Typography variant='h5'>##</Typography>
                        <Typography variant='h5'>Games</Typography>
                    </Box>
                    <Box>
                        <Typography variant='h5'>##</Typography>
                        <Typography variant='h5'>Following</Typography>
                    </Box>
                    <Box>
                        <Typography variant='h5'>##</Typography>
                        <Typography variant='h5'>Followers</Typography>
                    </Box>
                </Stack>
            </Stack>
        )
    }

    userProfileBody() {
        // User profile displaying games and other info

        return (
            <Stack
                alignItems='stretch'
                divider={<Divider orientation="horizontal" flexItem/>}
                spacing={4}>
                <Box>
                    <Typography variant='h4'>Favorite Games</Typography>

                </Box>
                <Box>
                    <Typography variant='h4'>Recent Games</Typography>
                    
                </Box>
                <Box>
                    <Typography variant='h4'>Recent Reviews</Typography>
                    
                </Box>
                <Box>
                    <Typography variant='h4'>Collection Games</Typography>
                    
                </Box>
            </Stack>
        )
    }

    render() {
        return (
            <Box>
                {this.userProfileHeader()}
                <Divider/>
                {this.userProfileBody()}
            </Box>
        )
    }
}