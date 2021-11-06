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

const data = [
  { date: '2020-10-01', rates: 0.851444 },
  { date: '2020-10-02', rates: 0.853468 },
  { date: '2020-10-03', rates: 0.853457 },
  { date: '2020-10-04', rates: 0.853599 },
  { date: '2020-10-05', rates: 0.848319 },
  { date: '2020-10-06', rates: 0.8522 },
  { date: '2020-10-07', rates: 0.849694 },
  { date: '2020-10-08', rates: 0.850026 },
  { date: '2020-10-09', rates: 0.845359 },
  { date: '2020-10-10', rates: 0.845248 },
  { date: '2020-10-11', rates: 0.84624 },
  { date: '2020-10-12', rates: 0.846445 },
  { date: '2020-10-13', rates: 0.851516 },
  { date: '2020-10-14', rates: 0.851586 },
  { date: '2020-10-15', rates: 0.854281 },
  { date: '2020-10-16', rates: 0.8535 },
  { date: '2020-10-17', rates: 0.853606 },
  { date: '2020-10-18', rates: 0.853756 },
  { date: '2020-10-19', rates: 0.849732 },
  { date: '2020-10-20', rates: 0.845445 },
  { date: '2020-10-21', rates: 0.843206 },
  { date: '2020-10-22', rates: 0.845805 },
  { date: '2020-10-23', rates: 0.843149 },
  { date: '2020-10-24', rates: 0.842993 },
  { date: '2020-10-25', rates: 0.844445 },
  { date: '2020-10-26', rates: 0.84692 },
  { date: '2020-10-27', rates: 0.848863 },
  { date: '2020-10-28', rates: 0.851165 },
  { date: '2020-10-29', rates: 0.856915 },
  { date: '2020-10-30', rates: 0.8565 }
];

export default function Chart() {
  return (
    <LineChart
      width={900}
      height={500}
      data={data}
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
      <Line type="monotone" dataKey="rates" stroke="#82ca9d" />
    </LineChart>
  );
}
