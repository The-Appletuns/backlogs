import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';
import withRouter from '../windows/withRouter';

class UserProfile extends Component {
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
            gamesCount: 0,
        }

        this.signOut = this.signOut.bind(this);
        this.userProfileHeader = this.userProfileHeader.bind(this);
        this.userProfileBody = this.userProfileBody.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        console.log('UserProfile componentDidMount', this.props.params.userId);

        const userID = this.props.params.userId || localStorage.getItem('mainUserID');
        console.log('UserID:', userID);
        await this.fetchUserData(userID);
    }

    async componentDidUpdate() {
        console.log('UserProfile componentDidUpdate', this.props.params.userId);

        const userID = this.props.params.userId || localStorage.getItem('mainUserID');
        console.log('UserID:', userID);
        await this.fetchUserData(userID);
    }

    async fetchUserData(userID) {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("ERROR Token does not exist");
            window.location.replace('/login');
            return;
        }

        const dbAccess = 'https://localhost:44414/api/user/' + userID;
        const authToken = 'Bearer ' + token;

        try {
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
                    followersCount: this.checkArrayEmpty(data.followers),
                    following: data.following,
                    followingCount: this.checkArrayEmpty(data.following),
                    games: data.games,
                    gamesCount: this.checkArrayEmpty(data.games)
                })
            } else {
                console.error("error fetching user data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data: ", error.message);
        }
    }

    signOut() {
        // Logout and reset state

        console.log("Signing out");
        localStorage.clear();
        this.setState({
            username: 'Username',
            firstName: 'First Name',
            lastName: 'Last Name',
            followers: [],
            followersCount: 0,
            following: [],
            followingCount: 0,
            games: [],
            gamesCount: 0
        });
        window.location.replace('/login');
    }

    checkArrayEmpty(arr) {
        if (arr.length === 1) {
            if (arr[0] === "") {
                return 0;
            }
        }

        return arr.length;
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
                <Button variant='contained' size='small' onClick={this.signOut}>Sign Out</Button>
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

export default withRouter(UserProfile);