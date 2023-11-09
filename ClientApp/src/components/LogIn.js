import { Typography, Box, FormControl, TextField } from '@mui/material';
import React, { Component } from 'react';
import { Button } from '@mui/material';

export class LogIn extends Component {
    static displayName = LogIn.name;

    constructor(props) {
        super(props);

        this.state = {
            loginError: false,
            signUp: true,
            email: "", 
            password: ""
        }

        this.loginWindow = this.loginWindow.bind(this);
        this.signUpWindow = this.signUpWindow.bind(this);
        this.printState = this.printState.bind(this);
    }

    componentDidMount() {
        // Send user data here
    }

    loginWindow() {
        // Login window for user

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

                <Button variant='contained' onClick={this.printState}>Login</Button>

                <Typography variant='h5'>Create an account</Typography>
                <Button variant='outlined'>Sign Up</Button>
            </Box>
        )
    }

    printState() {
        console.log(this.state);
    }

    signUpWindow() {
        // Sign up window for user

        return (
            <Box>
                <Typography variant='h3'>
                    Sign up for BackLogs!
                </Typography>

                <FormControl>
                    <TextField
                        required
                        label='Username'
                        variant='outlined'></TextField>

                    <TextField
                        required
                        label='Email'
                        variant='outlined'></TextField>

                    <TextField
                        required
                        label='First Name'
                        variant='outlined'></TextField>

                    <TextField
                        label='Last Name'
                        variant='outlined'></TextField>

                    <TextField
                        required
                        label='Password'
                        variant='outlined'></TextField>
                </FormControl>

                <Button variant='contained'>Sign Up</Button>

                <Typography variant='h5'>Already have an account?</Typography>
                <Button variant='outlined'>Login</Button>
            </Box>
        )
    }

    render() {
        var currentWindow = this.loginWindow();

        // if (this.state.signUp) {
        //     currentWindow = this.signUpWindow();
        // }

        return (
            <Box>
                {currentWindow}
            </Box>
        )
    }
}