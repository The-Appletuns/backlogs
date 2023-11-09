import { Typography, Box, Button, FormControl, TextField } from '@mui/material';




// Login window
export default function loginWindow() {
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
    );
}