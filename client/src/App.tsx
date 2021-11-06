import React from 'react';
import Box from '@mui/material/Box';
import DenseAppBar from './shared/components/AppBar'
import Typography from '@mui/material/Typography';
import CurrencyConverter from './shared/components/CurrencyConverter';
import RateBoard from './shared/components/RateBoard';
import Chart from './shared/components/Chart';

const App = () => {
  return (
    <Box sx={{ width: '100vw'}}>
      <DenseAppBar />
      <Box sx={{ width: '100vw', height: '90vh', display: 'flex'}}>
        <Box sx={{ width: '30vw', height: '90vh', display: 'flex', alignItems: 'center', flexDirection: 'column', p: 1 }}>
          <Box sx={{ m: 1, width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center'}}>
         
            <RateBoard />
          </Box>
          <Typography variant="h6" component="h2" sx={{ p: 1 }}>
            Currency Exchange
          </Typography>
          <CurrencyConverter />
        </Box>
        <Box sx={{ m: 2 }}>
          <Chart />
        </Box>
      </Box>
    </Box>
  );
}
export default App;