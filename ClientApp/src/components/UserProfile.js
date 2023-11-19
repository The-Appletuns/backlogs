import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GameDisplayLayout from '../windows/GameDisplayLayout';

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
            userType: null
        }

        this.signOut = this.signOut.bind(this);
        this.userProfileHeader = this.userProfileHeader.bind(this);
        this.userProfileBody = this.userProfileBody.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
        this.followButtonState = this.followButtonState.bind(this);
    }

    async componentDidMount() {
        // 
        // Once backend connected, checks if there is a /profile/{userid} or /profile link
        //      if with userid then go to that user profile specifically
        //      else go to the current user whos logged in
        // 

        console.log('UserProfile componentDidMount', this.props.params.userId);

        const userID = this.props.params.userId || localStorage.getItem('mainUserID');
        console.log('UserID:', userID);
        await this.fetchUserData(userID);
    }

    async componentDidUpdate() {
        // console.log('UserProfile componentDidUpdate', this.props.params.userId);

        const userID = this.props.params.userId || localStorage.getItem('mainUserID');
        // console.log('UserID:', userID);
        await this.fetchUserData(userID);
    }

    async fetchUserData(userID) {
        // 
        // Gets user information
        // 

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
        // 
        // Logout and reset state + delete token
        // 

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
        // 
        // Checks if the array is empty to make sure to give a value of 0
        // 

        if (arr.length === 1) {
            if (arr[0] === "") {
                return 0;
            }
        }

        return arr.length;
    }

    async followUser() {
        //
        // Follow user
        //      Should add user to following list
        //      Should add profile user to follower list
        // 

        let currentUser = localStorage.getItem("mainUserID");
        let followingUser = this.props.params.userId;

        console.log("Current User:", currentUser);
        console.log("Following User:", followingUser);

        const token = localStorage.getItem('token');

        if (!token) {
            console.error("ERROR Token does not exist");
            window.location.replace('/login');
            return;
        }

        const dbAccess = 'https://localhost:44414/api/user/follow';
        const authToken = 'Bearer ' + token;

        try {

            const response = await fetch(dbAccess, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
                body: JSON.stringify({
                    "CurrentUserID": currentUser,
                    "FollowingUserID": followingUser
                })
            })

            console.log(response);

            if (response.ok) {
                console.log("Follow request finished");
            } else {
                console.error("Error putting follow data: ", response.statusText);
            }

        } catch (error) {
            console.error("Error putting user data: ", error.message);
        }
    }

    async unfollowUser() {
        //
        // Unfollow user
        //      Should remove user to following list
        //      Should remove profile user to follower list
        // 

        let currentUser = localStorage.getItem("mainUserID");
        let followingUser = this.props.params.userId;

        console.log("Current User:", currentUser);
        console.log("Following User:", followingUser);

        const token = localStorage.getItem('token');

        if (!token) {
            console.error("ERROR Token does not exist");
            window.location.replace('/login');
            return;
        }

        const dbAccess = 'https://localhost:44414/api/user/unfollow';
        const authToken = 'Bearer ' + token;

        try {

            const response = await fetch(dbAccess, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
                body: JSON.stringify({
                    "CurrentUserID": currentUser,
                    "FollowingUserID": followingUser
                })
            })

            console.log(response);

            if (response.ok) {
                console.log("Follow request finished");
            } else {
                console.error("Error putting follow data: ", response.statusText);
            }

        } catch (error) {
            console.error("Error putting user data: ", error.message);
        }
    }

    followButtonState() {
        // 
        // Checks if user follows this user or not
        //      Returns appropriate button
        // 

        const currentProfile = this.props.params.userId;
        const userFollows = localStorage.getItem("mainUserID");

        if (currentProfile != null) {
            if (this.state.followers.includes(userFollows)) {
                // Place "followed" or "unfollow" button here
                return (
                    <Button
                        variant='contained'
                        size='large'
                        onClick={this.unfollowUser}>
                        Unfollow
                    </Button>
                );
            } else {
                // Place "follow" button here
                return (
                    <Button
                        variant='contained'
                        size='large'
                        onClick={this.followUser}>
                        Follow
                    </Button>
                );
            }
        } else {
            return (
                <Button variant='contained' size='small' onClick={this.signOut}>
                    Sign Out
                </Button>
            );
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
                    {/* <Button variant='contained' size='large'>Follow</Button> */}
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

                    {/* Number of followers */}
                    <Box>
                        <Typography variant='h5'>{this.state.followersCount}</Typography>
                        <Typography variant='h5'>Followers</Typography>
                    </Box>

                    {/* Number of people following */}
                    <Box>
                        <Typography variant='h5'>{this.state.followingCount}</Typography>
                        <Typography variant='h5'>Following</Typography>
                    </Box>

                </Stack>
                {/* <Button variant='contained' size='small' onClick={this.signOut}>Sign Out</Button> */}
                {this.followButtonState()}
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
                    <GameDisplayLayout gameList={this.state.games} rowHeight={400} column={5}/>
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