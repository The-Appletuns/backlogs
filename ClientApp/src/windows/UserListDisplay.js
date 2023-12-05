import React from 'react';
import { Box, Stack } from '@mui/material';
import UserDisplay from './UserDisplay';

// User list display
export default function UserListDisplay( {follow} ) {
    return(
        <Stack
            spacing={1}>
            {follow.map((user) => {
                return (
                    <UserDisplay user={user}/>
                )
            })}
        </Stack>
    )
}