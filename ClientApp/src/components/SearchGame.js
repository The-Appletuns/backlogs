import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Box, Button, TextField, Autocomplete, Grid, Typography, MenuItem, Select, InputLabel, FormControl, FormLabel, StepLabel, IconButton } from '@mui/material';

export class SearchGame extends Component {
    static displayName = SearchGame.name;

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            searchTerm: ''
        }

        this.fetchUserData = this.fetchUserData.bind(this);
        this.searchtext = this.searchtext.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async componentDidMount(){
        console.log("Component Mounted");
        // await this.fetchUserData();
    }

    async fetchUserData() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("ERROR Token does not exist");
            // window.location.replace('/search-game');
            return;
        }

        const dbAccess = 'https://localhost:44414/api/user/searchusername';
        // const authToken = 'Bearer ' + token;

        try {
            const response = await fetch(dbAccess, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': authToken
                }
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                this.setState({
                    user: data.username
                })
                console.log(this.state.user)
            } else {
                console.error("error fetching user data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data: ", error.message);
        }
    }

    handleSearchChange(event) {
        const term = event.target.value;
        this.setState({ searchTerm: term });
      }
    

    searchtext() {
        return (
            <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom={4}
            >
            </Box>
            <p>Search Term: {this.state.searchTerm}</p>
        </>
        )
    }

    searchLogic() {
        const { user, searchTerm } = this.state;

        const isMatch = user.toLowerCase().includes(searchTerm.toLowerCase());

        return (
            <div>
            {isMatch ? (
                <p>User Found: {user}</p>
            ) : (
                <p>No matching user found.</p>
            )}
            </div>
        );
      }

    render() {
        return(
            <Box textAlign="center" marginTop={2}>
                 <h1>Search</h1>
                 <TextField
                    label="Search games and users"
                    variant="outlined"
                    onChange={this.handleSearchChange}
                    fullWidth
                    margin="normal"
                />
                <IconButton variant="contained" color="black" onClick={this.fetchUserData}>
                    <SearchIcon />
                </IconButton>
                {this.searchtext()}
                {this.searchLogic()}
            </Box>
        )
    }


}
