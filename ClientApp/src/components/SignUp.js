import React, { Component } from 'react';
import { Typography, Box, FormControl, TextField } from '@mui/material';
import { Button } from '@mui/material';

export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super (props);

        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: ""
        }

        this.signUpPage = this.signUpPage.bind(this);
    }

    componentDidMount() {
        // Send user data here
    }

    signUpPressed = async () => {
        // When sign up button is pressed

        const username = this.state.username;
        const email = this.state.email;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const password = this.state.password;

        try {
            // Submit data here

            const response = await fetch('https://localhost:44414/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "username": username,
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "password": password
                })
            });

            if (response.ok) {
                console.log("Signed up");
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);

                // Redirect to login page
                window.location.replace('/login');
            } else {
                const errorText = await response.text();

                console.error('Signup Failed. Server response: ', errorText);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    signUpPage() {
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
                        variant='outlined'
                        value={this.state.username}
                        onChange={(event) => this.setState({username: event.target.value})}
                    ></TextField>

                    <TextField
                        required
                        label='Email'
                        variant='outlined'
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                    ></TextField>

                    <TextField
                        required
                        label='First Name'
                        variant='outlined'
                        value={this.state.firstName}
                        onChange={(event) => this.setState({firstName: event.target.value})}
                    ></TextField>

                    <TextField
                        label='Last Name'
                        variant='outlined'
                        value={this.state.lastName}
                        onChange={(event) => this.setState({lastName: event.target.value})}
                    ></TextField>

                    <TextField
                        required
                        label='Password'
                        variant='outlined'
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    ></TextField>
                </FormControl>

                <Button variant='contained' onClick={this.signUpPressed}>Sign Up</Button>

                <Typography variant='h5'>Already have an account?</Typography>
                <Button variant='outlined'>Login</Button>
            </Box>
        )
    }

    render() {
        return (
            <Box>
                {this.signUpPage()}
            </Box>
        )
    }
}