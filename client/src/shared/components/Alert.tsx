import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean
}
export default function Alerts({isSuccess, isError, isLoading}:Props) {
  return (
      <Stack sx={{ width: '50%' }} spacing={2}>
          {  
              isSuccess ? (
              <Alert severity="success">update success</Alert>
              ):  isError ? (
                     <Alert severity="error">error while updating</Alert>  
              ): isLoading ? (
                <Alert severity="info">updating</Alert>
              ): null
          }
    </Stack>
  );
}