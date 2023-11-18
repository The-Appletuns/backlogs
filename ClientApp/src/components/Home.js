import React, { Component } from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GameDisplay from '../windows/GameDisplay';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      trendingGames: null
    }

    this.fetchTrendingGameData = this.fetchTrendingGameData.bind(this);
    this.attachGameData = this.attachGameData.bind(this);
  }

  async componentDidMount() {
    // 
    // Backend mounted
    // 

    this.fetchTrendingGameData();

  }

  async componentDidUpdate() {
    // 
    // If backend updated
    // 

  }

  async fetchTrendingGameData() {
    // 
    // Gets trending game data
    // 
    console.log("Component Mounted");
    
    const dbGamesAccess = 'https://api.rawg.io/api/games?key=98a8b7c3c0ff460bbe11e7b0ca7a2375&page_size=5'

    try {
      const response = await fetch (dbGamesAccess, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({
          trendingGames: data.results
        });

        console.log(data.results);
      } else {
        console.error("Response ok but error fetching recent game data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recent game data: ", error.message);
    }

    console.log("finished fetching");
  }

  attachGameData(trendGameData) {

    if (trendGameData == null) {
      return (
        <Box>
          Loading Data
        </Box>
      )
    }

    return(
      <ImageList cols={5} rowHeight={400}>
        {trendGameData.map((item) => { 
          return (
            <GameDisplay game={item}/>
          )})}
    </ImageList>
    )
  }

  render() {
    return (
      <Box>
        <h1>Popular Games</h1>
        {this.attachGameData(this.state.trendingGames)}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <h1>Friend's Reviews</h1>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      This friend recommends this game
                    </Typography>
                    <Typography variant="h5" component="div">
                      Baldur's Gate 3
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      @sammiemac
                    </Typography>
                    <Typography variant="body2">
                      "One of THE games of all time!!!"
                    </Typography>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      This friend does not recommend this game
                    </Typography>
                    <Typography variant="h5" component="div">
                      League of Legends
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      @emergencyplayer
                    </Typography>
                    <Typography variant="body2">
                      "i have this idea for a start up that focuses on cloud computing AI generative GPT model that will allow us to create an external client side tool in order to grant 5G blockchain in the cyber security sector of natural language processing models in order to generate biometrics on how quantum computing can provide big data in an agumented and virtual reality space in the metaverse"
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>

            <Grid item xs={6}>
            <Item>
                <h1>Your Games</h1>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Steam
                    </Typography>
                    <Typography variant="h5" component="div">
                      Baldur's Gate 3
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      232 Hours Played
                    </Typography>
                    <Typography variant="body2">
                      Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power. 
                    </Typography>
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Riot Games
                    </Typography>
                    <Typography variant="h5" component="div">
                      VALORANT
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      420 Hours Played
                    </Typography>
                    <Typography variant="body2">
                      VALORANT is a first-person shooter in which players compete in team-based multiplayer matches. Players use an assortment of firearms and special abilities to kill opponents to complete mission objectives.
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          </Grid>

        </Box>

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