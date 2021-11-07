import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useGetCurrencyAnalyticsQuery } from '../../service/currency-exchange';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs'

export default function Chart() {
  const [currency,  setCurrency] = React.useState<string>('EUR');
  const [openFrom, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof currency>) => {
    setCurrency(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const end_date = dayjs().format('YYYY-MM-DD');
  const start_date = dayjs().subtract(30, 'days').format('YYYY-MM-DD');
  const { data } = useGetCurrencyAnalyticsQuery({ start_date, end_date, currency });
  return (
    <>
    <FormControl sx={{ ml: 10, width: 130 }}>
        <InputLabel id="demo-controlled-open-select-label">CURRENCY</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openFrom}
          onClose={handleClose}
          onOpen={handleOpen}
          value={currency}
          label="CURRENCY"
          onChange={handleChange}
            >
          <MenuItem value={'EUR'}>USD/EUR</MenuItem>
          <MenuItem value={'KES'}>USD/KES</MenuItem>
        </Select>
    </FormControl>
    <LineChart
      width={900}
      height={500}
      data={data?.rates}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
      </LineChart>
    </>
  );
}
