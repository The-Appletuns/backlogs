import React, { Component } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {Box, Button, TextField, Autocomplete, Grid, Typography, MenuItem, Select, InputLabel, FormControl, FormLabel, StepLabel} from '@mui/material';

const games = ["Baldur's Gate III", "Persona 5: Royal", "Animal Crossing: New Leaf", "The Sims 4"];

export class SearchGame extends Component {
    static displayName = SearchGame.name;

    constructor(props) {
        super(props);

        this.state = {
            gameGenres: null,
            platforms: null,
            searchTitle: null,
            searchGenre: null,
            searchPlatform: null,
        }

        this.fetchGenres = this.fetchGenres.bind(this);
        this.fetchPlatforms = this.fetchPlatforms.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
    }

    async componentDidMount() {
        // 
        // Connected to backend check
        // 

        this.fetchGenres();
        this.fetchPlatforms();
    }

    async componentDidUpdate() {
        // 
        // If backend updated
        // 


    }

    async fetchGenres() {
        // 
        // Gets game genre list
        // 

        const dbGenreAccess = 'https://api.rawg.io/api/genres?key=98a8b7c3c0ff460bbe11e7b0ca7a2375'

        try {
            const response = await fetch(dbGenreAccess, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                this.setState({
                    gameGenres: data.results
                });

                console.log("Game Genres:", data.results);
            } else {
                console.error("Response ok but error fetching genre data: ", response.statusText);
            }
        } catch(error) {
            console.error("Error fetching recent genre data: ", error.message);
        }
    }

    async fetchPlatforms() {
        // 
        // Gets platforms list
        // 

        const dbPlatformAccess = 'https://api.rawg.io/api/platforms?key=98a8b7c3c0ff460bbe11e7b0ca7a2375'

        try {
            const response = await fetch(dbPlatformAccess, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                this.setState({
                    platforms: data.results
                });

                console.log("Game platforms:", data.results);
            } else {
                console.error("Response ok but error fetching genre data: ", response.statusText);
            }
        } catch(error) {
            console.error("Error fetching recent genre data: ", error.message);
        }
    }

    searchClicked() {
        // 
        // Search button clicked and sends to backend to try and find data
        // 

        console.log("Search clicked");
        console.log(this.state.searchTitle);
        console.log(this.state.searchGenre);
        console.log(this.state.searchPlatform);

        // Send this data to backend and get a result
    }

    gameTitleSearch() {

        return (
            <TextField
                label='Game Title'
                variant='outlined'
                style={{ width: "100%"}}
                value={this.state.searchTitle}
                onChange={(event) => this.setState({
                    searchTitle: event.target.value
                    })}>

            </TextField>
        )
    }

    genreSelectForm(genreList) {

        if (genreList == null) {
            return (
                <Box>
                    Loading Genres
                </Box>
            )
        }

        return(
            <FormControl>
                <InputLabel id="genre-select-label">Genre</InputLabel>  
                <Select
                    labelId="genre-select-label"
                    sx={{
                        marginLeft: 19,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}
                    value={this.state.searchGenre}
                    onChange={(event) => this.setState({
                        searchGenre: event.target.value
                        })}
                >
                    {genreList.map((genre) => {
                        return (
                            <MenuItem value={genre.id}>{genre.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }

    platformSelectForm(platformList) {

        if (platformList == null) {
            return (
                <Box>
                    Loading Platforms
                </Box>
            )
        }

        return(
            <FormControl>
                <InputLabel id="platform-select-label">Platform</InputLabel>  
                <Select
                    labelId="platform-select-label"
                    sx={{
                        marginLeft: 19,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}
                    value={this.state.searchPlatform}
                    onChange={(event) => this.setState({
                        searchPlatform: event.target.value
                        })}
                >
                    {platformList.map((platform) => {
                        return (
                            <MenuItem value={platform.id}>{platform.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
    
    render() {
        return (

            <Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={4}
                >
                    <h1>Search Game</h1>
                </Box>

                {/* Search Title */}
                {this.gameTitleSearch()}

                {/* First Select */}
                {this.genreSelectForm(this.state.gameGenres)}

                {/* Second Select */}
                {this.platformSelectForm(this.state.platforms)}

                <Button
                    variant='contained'
                    onClick={this.searchClicked}>
                    Search
                </Button>
            </Box>
        );
        
    }
}