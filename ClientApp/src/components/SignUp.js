import React, { Component } from 'react';
import Button from '@mui/material';
import TextField from '@mui/material';
import FormControl from '@mui/material';
import Typography from '@mui/material';
import Box from '@mui/material';

export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super (props);

        this.state = {

        }
    }

    componentDidMount() {
        // Send user data here
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
        return (
            <Box>
                {this.signUpPage}
            </Box>
        )
    }
}