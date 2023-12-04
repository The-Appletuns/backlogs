import React from 'react';
import { Box, Typography } from '@mui/material';

export default function UserDisplay({user}) {
    return(
        <Box>
            <Typography>
                {user.username}
            </Typography>
            <Typography>
                {user.username}
            </Typography>
        </Box>
    )
}