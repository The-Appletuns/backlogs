import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function UserDisplay({user}) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser(user);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        fetchData();
    }, [user]);

    if (userData == null) {
        return <Box>Loading Data</Box>
    }

    return(
        <Button
            variant='outlined'
            color='secondary'
            size='small'
            onClick={() => {
                window.location.replace('/profile/' + userData.id);
            }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}>
                <PersonIcon fontSize='small'/>
                <Typography
                    variant='h5'>
                    {userData.username}
                </Typography>
                <SportsEsportsIcon fontSize='large'/>
                <Typography
                    variant='h5'>
                    {userData.games.length}
                </Typography>
            </Stack>
        </Button>
    )
}

async function getUser(id) {

    const token = localStorage.getItem('token');

    if (!token) {
        console.log("Login token not found");
        return;
    }

    const dbAccess = 'https://localhost:44414/api/user/' + id;
    const authToken = 'Bearer ' + token;

    const response = await fetch(dbAccess, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    });

    if (response.ok) {
        const data = await response.json();

        // console.log(data);
        
        return (data);
    } else {
        console.error("error fetching user following data:", response.statusText);
    }
}