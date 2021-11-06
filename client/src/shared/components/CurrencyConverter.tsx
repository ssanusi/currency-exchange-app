import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useConvertCurrencyMutation } from '../../service/currency-exchange';
const CurrencyConverter = () => {
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');
  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);
    
  
  const [ convertCurrency, { data }] = useConvertCurrencyMutation()
  
   
  const handleChangeTo = (event: SelectChangeEvent<typeof to>) => {
    setTo(event.target.value);
  };

  const handleChangeFrom = (event: SelectChangeEvent<typeof from>) => {
    setFrom(event.target.value);
  };
  
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
    
  const handleConvertCurrency = async () => {
    await convertCurrency({ value: Number(value), to })
  };
  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

   const handleCloseTo = () => {
    setOpenTo(false);
  };

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };
  const handleOpenTo = () => {
    setOpenTo(true);
  };
  return (
    <Box
     component="form"
     sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }}}
     noValidate
     autoComplete="off">
        <Box sx={{ display: 'flex'}}>
             <TextField
               id="outlined-number"
               label="Amount"
               value={value}
               InputLabelProps={{
                  shrink: true,
               }}
                onChange={handleChangeValue}
              />
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-controlled-open-select-label">From</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openFrom}
                onClose={handleCloseFrom}
                onOpen={handleOpenFrom}
                value={from}
                label="From"
                onChange={handleChangeFrom}
                  >
                <MenuItem value={'USD'}>USD</MenuItem>
              </Select>
            </FormControl>
            </Box>
            <Box sx={{ display: 'flex'}}>
              <TextField
               id="outlined-number"
               label="Equivalent"
               defaultValue=""
               value={data?.convertedValue}
               InputLabelProps={{
                  shrink: true,
               }}
                
              />
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-controlled-open-select-label">To</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openTo}
                  onClose={handleCloseTo}
                  onOpen={handleOpenTo}
                  value={to}
                  label="To"
                  onChange={handleChangeTo}
                  >
                  <MenuItem value={'EUR'}>EUR</MenuItem>
                  <MenuItem value={'KES'}>KES</MenuItem>
                </Select>
            </FormControl>
            </Box>
          <Box>
           <Button variant="contained" sx={{ m: 1, width: '95%', height: '50px' }} onClick={handleConvertCurrency}>
                Convert
            </Button> 
        </Box>
    </Box>
  );
}
export default CurrencyConverter;