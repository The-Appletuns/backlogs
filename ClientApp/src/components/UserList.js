import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { Component } from 'react';

export class UserList extends Component {
    static displayName = UserList.name;

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            loading: true
        }
    }

    componentDidMount() {
        this.userListStringData();
    }

    static renderUserData(userData) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            First Name
                        </TableCell>
                        <TableCell>
                            Last Name
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map(user =>
                        <TableRow key={user.username}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : UserList.renderUserData(this.state.userData);

        return (
            <Box>
                {contents}
            </Box>
        )
    }

    async userListStringData() {
        const response = await fetch('userList');
        console.log(response);
        const userData = await response.json();
        console.log(userData);
        this.setState({
            userData: userData,
            loading: false
        });
    }
}