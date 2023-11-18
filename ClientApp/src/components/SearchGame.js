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
        }

        this.fetchGenres = this.fetchGenres.bind(this);
        this.fetchPlatforms = this.fetchPlatforms.bind(this);
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
                    Loading Genres
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

            <><Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom={4}
            >
                <h1>Search Game</h1>
            </Box>
            <Autocomplete
                style={{ width: "100%"}}
                options={games}
                renderInput={(params) => {
                    return (
                        <div ref={params.InputProps.ref}>
                            {/* <label htmlFor='game-lists'>Game Title:</label> */}
                            <input
                                id='game-lists'
                                type='text'
                                placeholder='Game Title'
                                style={{
                                    border: "1px solid #cccccc",
                                    padding: "10px",
                                    width: "100%",
                                }}
                                {...params.inputProps}
                            />
                        </div>
                    );
                }}
            />
            {/* First Select */}
            {this.genreSelectForm(this.state.gameGenres)}

            {/* Second Select */}
            {this.platformSelectForm(this.state.platforms)}
            {/* <FormControl>
                <InputLabel id="platform-select-label">Platform</InputLabel> 
                <Select
                    labelId="platform-select-label"
                    sx={{
                        marginLeft: 12,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>PlayStation</MenuItem>
                    <MenuItem value={2}>Xbox</MenuItem>
                    <MenuItem value={3}>PC</MenuItem>
                </Select>
            </FormControl> */}

            {/* Third Select */}
            {/* <FormControl>
                <InputLabel id="rating-select-label">Rating</InputLabel>
                <Select
                    labelId="rating-select-label"
                    sx={{
                        marginLeft: 18,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>5 Stars</MenuItem>
                    <MenuItem value={2}>4 Stars</MenuItem>
                    <MenuItem value={3}>3 Stars</MenuItem>
                    <MenuItem value={4}>2 Stars</MenuItem>
                    <MenuItem value={5}>1 Star</MenuItem>
                </Select>
            </FormControl> */}

            {/* <FormControl>
                <InputLabel id="setting-select-label">Setting</InputLabel>
                <Select
                    labelId="setting-select-label"
                    sx={{
                        marginTop: 5,
                        marginLeft: 40,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>Fantasy</MenuItem>
                    <MenuItem value={2}>Post-apocalyptic</MenuItem>
                    <MenuItem value={3}>Sci-fi</MenuItem>
                </Select>
            </FormControl> */}

            {/* <FormControl>
                <InputLabel id="date-select-label">Release Date</InputLabel>
                <Select
                    labelId="date-select-label"
                    sx={{
                        marginTop: 5,
                        marginLeft: 12,
                        width: 250,
                        height: 50,
                    }}
                    
                >
                    <MenuItem value={1}>2017</MenuItem>
                    <MenuItem value={2}>1990</MenuItem>
                    <MenuItem value={3}>2023</MenuItem>

                </Select>
            </FormControl> */}
            </>

            
        );
        
    }
}