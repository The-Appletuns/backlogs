import { ImageList } from '@mui/material';
import React from 'react';
import GameDisplay from './GameDisplay';

export default function GameDisplayLayout({gameList, rowHeight, column}) {
    return (
        <ImageList cols={column} rowHeight={rowHeight}>
            {gameList.map((game) => {
                return (
                    <GameDisplay game={game}/>
                )
            })}
        </ImageList>
    )
}