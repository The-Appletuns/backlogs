import { Typography, Box, FormControl, TextField } from '@mui/material';
import React, { Component } from 'react';
import { Button } from '@mui/material';
import Login from "../windows/LoginWindow";

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

            const response = await fetch('https://localhost:44414/api/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            console.log("Got past reponse")

            if (response.ok) {
                console.log("repose ok")
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);
            } else {
                console.error('Login failed');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    loginPage() {
        // Login window for user

        // return (
        //     <Login/>
        // );
        return (
            <Box>
                <Typography variant='h3'>
                    Login to BackLogs
                </Typography>

                <FormControl>
                    <TextField
                        required
                        label='Username'
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
                    ></TextField>
                </FormControl>

                <Button variant='contained' onClick={this.loginPressed}>Login</Button>

                <Typography variant='h5'>Create an account</Typography>
                <Button variant='outlined'>Sign Up</Button>
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