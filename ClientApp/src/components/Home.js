import React, { Component } from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GameDisplayLayout from '../windows/GameDisplayLayout';

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
      trendingGames: null,
      highestRatedGames: null
    }

    this.fetchTrendingGameData = this.fetchTrendingGameData.bind(this);
    this.fetchHighestRatedGameData = this.fetchHighestRatedGameData.bind(this);
    this.attachTrendingGameData = this.attachTrendingGameData.bind(this);
    this.attachHighestRatedGameData = this.attachHighestRatedGameData.bind(this);
  }

  async componentDidMount() {
    // 
    // Backend mounted
    // 

    this.fetchTrendingGameData();
    this.fetchHighestRatedGameData();

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
    
    const dbGamesAccess = 'https://api.rawg.io/api/games?key=98a8b7c3c0ff460bbe11e7b0ca7a2375&page_size=5&metacritic=80,100&dates=2023-01-01,2023-11-01'

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

  attachTrendingGameData(trendGameData) {

    if (trendGameData == null) {
      return (
        <Box>
          Loading Data
        </Box>
      )
    }

    return(
      <GameDisplayLayout gameList={trendGameData} rowHeight={400} column={5}/>
    )
  }

  async fetchHighestRatedGameData() {
    // 
    // Gets highest rated game data
    // 
    console.log("Component Mounted");
    
    const dbGamesAccess = 'https://api.rawg.io/api/games?key=98a8b7c3c0ff460bbe11e7b0ca7a2375&page_size=5&metacritic=95,100'

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
          highestRatedGames: data.results
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

  attachHighestRatedGameData(highestRatedGameData) {

    if (highestRatedGameData == null) {
      return (
        <Box>
          Loading Data
        </Box>
      )
    }

    return(
      <GameDisplayLayout gameList={highestRatedGameData} rowHeight={400} column={5}/>
    )
  }

  render() {
    return (
      <Box>
        {/* Games released in 2023 that have a Metacritic rating between 80 - 100 */}
        <h1>Trending Games</h1>
        <p>Games released in 2023 with a Metacritic score over 80</p>
        {this.attachTrendingGameData(this.state.trendingGames)}

        {/* Games with a Metacritic rating between 90 - 100 */}
        <h1>Highest Rated Games of All Time</h1>
        <p>Games with a Metacritic score over 95</p>
        {this.attachHighestRatedGameData(this.state.highestRatedGames)}

        {/* <Box sx={{ flexGrow: 1 }}>
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

        </Box> */}

      </Box>
      
      
  );
  }
}