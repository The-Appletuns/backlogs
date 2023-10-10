import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Box>
        <h1>Trending Games</h1>
        <ImageList cols={5} rowHeight={400}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    {/* <InfoIcon /> */}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      
  );
      // <Box>
      //   <h1>The Appletuns!</h1>
      //   <p>Welcome to backlogs</p>
      //   <Button variant='contained'>LMAO OK</Button>
      //   <h1>POOP</h1>
      // </Box>
    // );
  }
}

const itemData = [
  {
    img: 'https://cdn.discordapp.com/attachments/902056237011709973/1161039938905722910/MV5BMWVlMDdhNzYtNDY5ZS00YzdiLWI3NWEtMDUzMGQyMWQ2NDY3XkEyXkFqcGdeQXVyNDg4NjY5OTQ._V1_FMjpg_UX1000_.jpg?ex=6536d9b4&is=652464b4&hm=c945efafe56a06539cdc8360a8772eb8b3c286aeffdcc2c38c58452120b670db&',
    title: 'Baldur\'s Gate 3',
    author: 'Larian Studios',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/902056237011709973/1161040022095536218/MV5BMDNkZDVkODEtNjQyYy00NGYwLTljMGQtOTI2MDAwY2ZlOWFmXkEyXkFqcGdeQXVyNjM2MTY3MTY._V1_.jpg?ex=6536d9c8&is=652464c8&hm=137179eef0d0184d602a7ae0623372e689503a95d7a2adb87715aa8a846bb546&',
    title: 'Overwatch 2',
    author: 'Actvision-Blizzard',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/902056237011709973/1161040171567943860/71LTpSLz57L.jpg?ex=6536d9eb&is=652464eb&hm=4a10fd10a7c1a5a4e13e61f8677a097959936008d278471f324536b781d10043&',
    title: 'VALORANT',
    author: 'Riot Games',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/902056237011709973/1161040973078470766/816OHFGLA1L.jpg?ex=6536daab&is=652465ab&hm=6d90f321f9d6923d85803c104029a86df14729148acd9a9dd067d38739935a08&',
    title: 'Destiny 2',
    author: 'Bungie',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/902056237011709973/1161041078397456524/MV5BOTlhMTdiY2YtOTI3My00Y2M5LWI5YWQtYzgyYzgzMzhlMzExXkEyXkFqcGdeQXVyMzM2MzI5MzU._V1_.jpg?ex=6536dac4&is=652465c4&hm=5d6d8eaf432cb737e07bc8921779f54a862f1510d19bbd5c2448d0c389760d85&',
    title: 'Apex Legends',
    author: 'Respawn Entertainment'
  }
];