import React, { Component } from 'react';
import { Typography, Box, FormControl, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super (props);

        this.state = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            following: [],
            followers: [],
            games: [],
            usernameError: false,
            emailError: false,
            firstNameError: false,
            lastNameError: false,
            passwordError: false,
        }

        this.signUpPage = this.signUpPage.bind(this);
        this.usernameBlur = this.usernameBlur.bind(this);
        this.emailBlur = this.emailBlur.bind(this);
        this.firstNameBlur = this.firstNameBlur.bind(this);
        this.lastNameBlur = this.lastNameBlur.bind(this);
        this.passwordBlur = this.passwordBlur.bind(this);
    }

    componentDidMount() {
        // Send user data here
    }

    signUpPressed = async () => {
        // When sign up button is pressed

        if (this.state.usernameError ||
            this.state.emailError ||
            this.state.firstNameError ||
            this.state.lastNameError ||
            this.state.passwordError) {
                window.alert("Sign Up Errors");
                console.log("error Signing up");
                return;
        }

        const username = this.state.username.toLowerCase();
        const email = this.state.email.toLowerCase();
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
                    "password": password,
                    "followers": [],
                    "following": [],
                    "games": []
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

    usernameBlur() {
        // When user clicks off, then check if valid

        if (this.state.username.includes(" ") || this.state.username == null) {
            this.setState({
                usernameError: true
            })
        } else {
            this.setState({
                usernameError: false
            })
        }
    }

    emailBlur() {
        // When user clicks off, then check if valid

        if (!this.state.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
            || this.state.email == null) {
            this.setState({
                emailError: true
            })
        } else {
            this.setState({emailError: false});
        }
    }

    firstNameBlur() {
        // When user clicks off, then check if valid

        if (this.state.firstName == null) {
            this.setState({
                firstNameError: true
            })
        } else {
            this.setState({
                firstNameError: false
            })
        }
    }

    lastNameBlur() {
        // When user clicks off, then check if valid

        if (this.state.lastName == null) {
            this.setState({
                lastNameError: true
            })
        } else {
            this.setState({
                lastNameError: false
            })
        }
    }

    passwordBlur() {
        // When user clicks off, then check if valid

        if (this.state.password == null) {
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                passwordError: false
            })
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
                        onBlur={this.usernameBlur}
                        error={this.state.usernameError}
                        sx={{m: 1}}
                    ></TextField>

                    <TextField
                        required
                        label='Email'
                        variant='outlined'
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                        onBlur={this.emailBlur}
                        error={this.state.emailError}
                        sx={{m: 1}}
                    ></TextField>

                    <TextField
                        required
                        label='First Name'
                        variant='outlined'
                        value={this.state.firstName}
                        onChange={(event) => this.setState({firstName: event.target.value})}
                        onBlur={this.firstNameBlur}
                        error={this.state.firstNameError}
                        sx={{m: 1}}
                    ></TextField>

                    <TextField
                        label='Last Name'
                        variant='outlined'
                        value={this.state.lastName}
                        onChange={(event) => this.setState({lastName: event.target.value})}
                        onBlur={this.lastNameBlur}
                        error={this.state.lastNameError}
                        sx={{m: 1}}
                    ></TextField>

                    <TextField
                        required
                        label='Password'
                        variant='outlined'
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                        onBlur={this.passwordBlur}
                        error={this.state.passwordError}
                        sx={{m: 1}}
                        type='password'
                    ></TextField>

                    <Button variant='contained' onClick={this.signUpPressed} sx={{m: 1}}>Sign Up</Button>
                </FormControl>

                <Typography variant='h5' sx={{m: 2}}>Already have an account? Log In!</Typography>
                <Button variant='outlined' component={Link} to="/login" sx={{m: 1, width: 200}}>Login</Button>
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