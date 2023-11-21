import { Typography, Box, FormControl, TextField } from '@mui/material';
import React, { Component } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export class LogIn extends Component {
    static displayName = LogIn.name;

    constructor(props) {
        super(props);

        this.state = {
            loginError: false,
            email: "", 
            password: ""
        }

        this.loginPage = this.loginPage.bind(this);
        this.printState = this.printState.bind(this);
        // this.loginPressed = this.loginPressed.bind(this);
    }

    componentDidMount() {
        // Send user data here
    }

    loginPressed = async () => {
        // When login button pressed
        const email = this.state.email;
        const password = this.state.password;
        console.log("Print pressed")

        try {
            console.log("Got to try")

            const response = await fetch('http://vgbacklogs.com/api/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email, "password": password })
            });

            console.log("Got past reponse")
            console.log(response)

            // Isolated issue and found that other fields aside from email and password are required
            if (response.ok) {
                console.log("Logged in")
                const data = await response.json();

                console.log(data);
                console.log(data.currentUser);
                console.log(data.currentUser.id);

                const token = data.token;
                const userID = data.currentUser.id;

                localStorage.setItem('token', token);
                localStorage.setItem('mainUserID', userID);

                // Need some way to redirect to profile after logging in
                // Temp fix i think this is wrong
                window.location.replace('/profile');
            } else {
                const errorText = await response.text();

                window.alert('Wrong email or password. Try again');

                console.error('Login Failed. Server response: ', errorText);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    loginPage() {
        // Login window for user

        return (
            <Box>
                <Typography variant='h3'>
                    Login to BackLogs
                </Typography>

                <FormControl>
                    <TextField
                        required
                        label='Email'
                        variant='outlined'
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                    ></TextField>
                    <TextField
                        required
                        label='Password'
                        variant='outlined'
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                        type='password'
                    ></TextField>
                </FormControl>

                <Button variant='contained' onClick={this.loginPressed}>Login</Button>

                <Typography variant='h5'>Create an account</Typography>
                <Button component={Link} to="/signup" variant='outlined'>Sign Up</Button>
            </Box>
        )
    }

    printState() {
        console.log(this.state);
    }

    render() {
        var currentWindow = this.loginPage();

        return (
            <Box>
                {currentWindow}
            </Box>
        )
    }
}