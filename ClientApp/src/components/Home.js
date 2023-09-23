import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Box>
        <h1>The Appletuns!</h1>
        <p>Welcome to backlogs</p>
        <Button variant='contained'>LMAO OK</Button>
        <h1>POOP</h1>
      </Box>
    );
  }
}
