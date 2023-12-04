import React, { Component } from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
        <Box sx={{m: 3, p: 3, border: 5, borderColor: 'grey.500', borderRadius: '16px'}}>

          {/* Games released in 2023 that have a Metacritic rating between 80 - 100 */}
          <h1>Trending Games</h1>
          <p>Games released in 2023 with a Metacritic score over 80</p>
          {this.attachTrendingGameData(this.state.trendingGames)}

        </Box>

        <Box sx={{m: 3, p: 3, border: 5, borderColor: 'grey.500', borderRadius: '16px'}}>

          {/* Games with a Metacritic rating between 90 - 100 */}
          <h1>Highest Rated Games of All Time</h1>
          <p>Games with a Metacritic score over 95</p>
          {this.attachHighestRatedGameData(this.state.highestRatedGames)}

        </Box>
      </Box>
      
  );
  }
}