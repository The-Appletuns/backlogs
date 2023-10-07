import React, { Component } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {Box, Button, TextField, Autocomplete, Grid, Typography, MenuItem, Select, InputLabel, FormControl, FormLabel, StepLabel} from '@mui/material';

const games = ["Baldur's Gate III", "Persona 5: Royal", "Animal Crossing: New Leaf", "The Sims 4"];

export class SearchGame extends Component {
    static displayName = SearchGame.name;
    
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
            <FormControl >
                <InputLabel id="genre-select-label">Genre</InputLabel>  
                <Select
                    labelId="genre-select-label"
                    sx={{
                        marginLeft: 3.5,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}                
                >
                    <MenuItem value={1}>Action</MenuItem>
                    <MenuItem value={2}>Puzzle</MenuItem>
                    <MenuItem value={3}>Role-Playing</MenuItem>
                    <MenuItem value={4}>Simulatiom</MenuItem>
                    <MenuItem value={5}>Yellow</MenuItem>
                </Select>
            </FormControl>

            {/* Second Select */}
            <FormControl>
                <InputLabel id="platform-select-label">Platform</InputLabel> 
                <Select
                    labelId="platform-select-label"
                    sx={{
                        marginLeft: 8,
                        marginTop: 5,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>PlayStation</MenuItem>
                    <MenuItem value={2}>Xbox</MenuItem>
                    <MenuItem value={3}>PC</MenuItem>
                </Select>
            </FormControl>

            {/* Third Select */}
            <FormControl>
                <InputLabel id="rating-select-label">Rating</InputLabel>
                <Select
                    labelId="rating-select-label"
                    sx={{
                        marginLeft: 8,
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
            </FormControl>

            <FormControl>
                <InputLabel id="setting-select-label">Setting</InputLabel>
                <Select
                    labelId="setting-select-label"
                    sx={{
                        marginTop: 5,
                        marginLeft: 22,
                        width: 250,
                        height: 50,
                    }}
                >
                    <MenuItem value={1}>Fantasy</MenuItem>
                    <MenuItem value={2}>Post-apocalyptic</MenuItem>
                    <MenuItem value={3}>Sci-fi</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="date-select-label">Release Date</InputLabel>
                <Select
                    labelId="date-select-label"
                    sx={{
                        marginTop: 5,
                        marginLeft: 10,
                        width: 250,
                        height: 50,
                    }}
                    
                >
                    <MenuItem value={1}>2017</MenuItem>
                    <MenuItem value={2}>1990</MenuItem>
                    <MenuItem value={3}>2023</MenuItem>

                </Select>
            </FormControl>
            </>

            
        );
        
    }
}