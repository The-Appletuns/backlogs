import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';


export class UserProfile extends Component {
    static displayName = UserProfile.name;

    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {
        // Get user data from backend
    }

    userProfileHeader() {
        // User info at the header

        return (
            <Stack direction="row" alignItems='center' justifyContent='space-between'>
                <Stack 
                    direction="row" 
                    alignItems='center' 
                    justifyContent='space-around'
                    spacing={4}>
                    {/* Person Icon substitutes for the Profile Pic */}
                    <PersonIcon fontSize='large'/>

                    {/* Username is the username lmao */}
                    <Typography variant='h2'>Username</Typography>

                    {/* Button would either be Follow, Following, Edit Profile */}
                    <Button variant='contained' size='large'>Follow</Button>
                </Stack>
                <Stack 
                    direction="row"
                    alignItems='center'
                    divider={<Divider orientation="vertical" flexItem/>}
                    spacing={2}>

                    {/* Number of games played */}
                    <Box>
                        <Typography variant='h5'>##</Typography>
                        <Typography variant='h5'>Games</Typography>
                    </Box>

                    {/* Number of people following */}
                    <Box>
                        <Typography variant='h5'>##</Typography>
                        <Typography variant='h5'>Following</Typography>
                    </Box>

                    {/* Number of followers */}
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

                {/* Shows horizontal list of favorite games */}
                <Box>
                    <Typography variant='h4'>Favorite Games</Typography>

                </Box>

                {/* Shows horizontal list of recent games played */}
                <Box>
                    <Typography variant='h4'>Recent Games</Typography>
                    
                </Box>

                {/* Shows Reviews of games */}
                <Box>
                    <Typography variant='h4'>Recent Reviews</Typography>
                    
                </Box>

                {/* Shows grid of game collection */}
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