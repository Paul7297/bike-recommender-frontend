import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PriceGraph({ bike }) {
  if (!bike) return null;

  const data = [
    { year: "Now", price: bike.price },
    { year: "1 Year", price: bike.price_after_1_year },
    { year: "2 Year", price: bike.price_after_2_year },
    { year: "3 Year", price: bike.price_after_3_year }
  ];

  return (
    <div className="mt-3" style={{ height: 220 }}>
      <h6>📉 Price Depreciation</h6>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceGraph;