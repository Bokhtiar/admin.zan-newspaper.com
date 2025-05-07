import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Sample data for the last 12 months
const data = [
  { month: "Jan", news: 30 },
  { month: "Feb", news: 40 },
  { month: "Mar", news: 35 },
  { month: "Apr", news: 50 },
  { month: "May", news: 60 },
  { month: "Jun", news: 55 },
  { month: "Jul", news: 65 },
  { month: "Aug", news: 70 },
  { month: "Sep", news: 80 },
  { month: "Oct", news: 85 },
  { month: "No", news: 90 },
  { month: "Dec", news: 10 },
];

const RecentOrderChart = () => {
  return (
    <div className="w-full h-[450px] dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle  pt-3 pb-10 shadow-md pr-5 -pl-5 ">
      <h2 className="text-xl font-bold text-center mb-4">Recent Publications (Last 12 Months)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="news"
            stroke="#1E40AF" // Blue line color
            fill="#1E40AF"  // Blue area fill color
            fillOpacity={0.3}  // Bottom area opacity
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentOrderChart;
