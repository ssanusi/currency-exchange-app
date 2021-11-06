import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGetLatestRateQuery, useUpdateRatesMutation } from '../../service/currency-exchange';
import dayjs from 'dayjs'
import Alerts from './Alert';

const RateBoard = () => {
    const { data, error, isLoading } = useGetLatestRateQuery();
    const [ updateRates, { isLoading: updating, isError, isSuccess }] = useUpdateRatesMutation()

    return (
        <>
            <Alerts isLoading={updating} isError={isError} isSuccess={isSuccess} />
            <Typography variant="h6">
              Latest Rate
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {
                error ? ( <> Oh no, there was an error</>) : isLoading ? ( <> Loading...</>) : data ? (
            <>
            <Typography>
                {`Date : ${ data?.date ? dayjs(data?.date).format('DD/MM/YYYY') : '---'}`}
            </Typography>
            <Typography>
            {`USD/EUR : ${ data?.rates?.EUR ? data?.rates.EUR : '---'}`}
            </Typography>
            <Typography>
            {`USD/KES : ${ data?.rates?.KES ? data?.rates.KES : '---'}`}
            </Typography>
        </>
            ) : null
            }
            <Button variant="contained" sx={{ m: 1, width: '50%', height: '50px' }} onClick={() => updateRates()}>
                UPDATE
            </Button>  
            </Box>
        </>
  );
}
export default RateBoard;