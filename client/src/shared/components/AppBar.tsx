import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', height: '10vh'}}>
      <AppBar position="static" sx={{ height: '10vh', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Currency Converter
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}