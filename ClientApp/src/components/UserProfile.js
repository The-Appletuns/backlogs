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
            username: 'Username',
            firstName: 'First Name',
            lastName: 'Last Name',
            followers: [],
            followersCount: 0,
            following: [],
            followingCount: 0,
            games: [],
            gamesCount: 0
        }

    }

    async componentDidMount() {
        // Get user data from backend
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("ERROR Token does not exist");
            return;
        }

        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userID');
        console.log("Component Mounted");
        console.log(isLoggedIn);

        const dbAccess = 'https://localhost:44414/api/user/' + isLoggedIn;
        const authToken = 'Bearer ' + token;

        if (isLoggedIn != null) {
            console.log("Token is not NULL, fetching data now");

            const response = await fetch(dbAccess, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    followers: data.followers,
                    following: data.following,
                    games: data.games
                })
            }

            // fetch(dbAccess)
            //     .then(response => response.json())
            //     .then(data => {
            //         this.setState({
            //             username: data.username,
            //             firstName: data.firstName,
            //             lastName: data.lastName,
            //             followers: data.followers,
            //             following: data.following,
            //             games: data.games
            //         })
            //     })
            //     .catch(error => {
            //         console.error('Error fetching user data: ', error);
            //     })
        } else {
            // Redirect the user to the login page
        }

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
                    <Typography variant='h2'>{this.state.username}</Typography>

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
                        <Typography variant='h5'>{this.state.gamesCount}</Typography>
                        <Typography variant='h5'>Games</Typography>
                    </Box>

                    {/* Number of people following */}
                    <Box>
                        <Typography variant='h5'>{this.state.followingCount}</Typography>
                        <Typography variant='h5'>Following</Typography>
                    </Box>

                    {/* Number of followers */}
                    <Box>
                        <Typography variant='h5'>{this.state.followersCount}</Typography>
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