import React, {useState, useEffect} from 'react';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

// Game display
export default function GameDisplay({game}) {

    const [isOwned, setIsOwned] = useState(false);

    useEffect(() => {
        async function checkOwnership() {
            const result = await ownedGame(game.id);
            setIsOwned(result);
        }

        checkOwnership();
    }, [game.id]);

    const handleIconClick = async () => {
        if (isOwned) {
            await removeGame(game.id);
        } else {
            await addGame(game.id);
        }

        setIsOwned(!isOwned);
    };

    return(
        <ImageListItem key={game.background_image}>
            <img
                srcSet={`${game.background_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${game.background_image}?w=248&fit=crop&auto=format`}
                alt={game.name}
                loading='lazy'
            />
            
            <ImageListItemBar
                title={game.name}
                // subtitle={game.genres[0].name}
                actionIcon={
                    <IconButton 
                        sx={{ color: 'rgba(255, 255, 255, 0.75)'}}
                        onClick={handleIconClick}
                        >
                        {isOwned ? <CheckIcon /> : <AddIcon />}
                    </IconButton>
                }
            />
        </ImageListItem>
    )
}

async function ownedGame(gameID) {
    // Checks if user owns game, determines icon

    const token = localStorage.getItem('token');

    if (!token) {
        console.log("Login token not found");
        return;
    }

    const userID = localStorage.getItem('mainUserID');
    const dbAccess = 'https://localhost:44414/api/user/' + userID;
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

        return (data.games.includes(gameID));
    } else {
        console.error("error fetching user data:", response.statusText);
    }
}

async function addGame(gameID) {
    // Adds game to user collection
    // if user is not logged in then reroute to login page

    const token = localStorage.getItem('token');

    if (!token) {
        console.log("login token not found");
        window.location.replace('/login');
        return;
    }

    const userID = localStorage.getItem('mainUserID');
    const dbAccess = 'https://localhost:44414/api/user/addgame';
    const authToken = 'Bearer ' + token;

    try {

        console.log("Sending request with payload:", JSON.stringify({
            "CurrentUserID": userID,
            "GameID": gameID
        }));

        const response = await fetch(dbAccess, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({
                "CurrentUserID": userID,
                "GameID": gameID
            })
        })

        console.log(response);

        if (response.ok) {
            console.log("Game Added");
        } else {
            console.error("Response ok but error putting game data:", response.statusText);
        }

    } catch (error) {
        console.error("Error fetching user data: ", error.message);
    }
}

async function removeGame(gameID) {
    // Adds game to user collection
    // if user is not logged in then reroute to login page

    const token = localStorage.getItem('token');

    if (!token) {
        console.log("login token not found");
        window.location.replace('/login');
        return;
    }

    const userID = localStorage.getItem('mainUserID');
    const dbAccess = 'https://localhost:44414/api/user/removegame';
    const authToken = 'Bearer ' + token;

    try {

        console.log("Sending request with payload:", JSON.stringify({
            "CurrentUserID": userID,
            "GameID": gameID
        }));

        const response = await fetch(dbAccess, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({
                "CurrentUserID": userID,
                "GameID": gameID
            })
        })

        console.log(response);

        if (response.ok) {
            console.log("Game Removed");
        } else {
            console.error("Response ok but error putting game data:", response.statusText);
        }

    } catch (error) {
        console.error("Error fetching user data: ", error.message);
    }
}