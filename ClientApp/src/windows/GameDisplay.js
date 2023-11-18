import React from 'react';
import { ImageListItem, ImageListItemBar, Typography } from '@mui/material';

// Game display
export default function GameDisplay({game}) {
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
                subtitle={game.genres[0].name}
            />
        </ImageListItem>
    )
}