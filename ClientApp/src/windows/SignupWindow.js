

// Sign up window
export default function signupWindow() {

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