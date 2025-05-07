import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', Published: 250, Approved: 200 },
  { name: 'Feb', Published: 300, Approved: 260 },
  { name: 'Mar', Published: 280, Approved: 270 },
  { name: 'Apr', Published: 320, Approved: 300 },
  { name: 'May', Published: 400, Approved: 350 },
  { name: 'Jun', Published: 370, Approved: 360 },
  { name: 'Jul', Published: 290, Approved: 280 },
  { name: 'Aug', Published: 310, Approved: 300 },
];
export default function EarningsChart() {
  return (
    <div className="h-[450px] p-3 shadow-md rounded-md dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle">
      <h2 className="text-lg font-semibold mb-2">Reader Engagement Chart</h2>
      <div className="flex justify-between items-center ">
      <div>
          <span className="text-sm text-gray-500">Published</span>
          <h3 className="text-xl font-bold">3,020</h3>
          <span className="text-blue-500 text-sm">↑ Consistent</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Approved</span>
          <h3 className="text-xl font-bold">2,720</h3>
          <span className="text-green-500 text-sm">↑ 90%</span>
        </div>
      </div>

      {/* Earnings Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Published" fill="#60a5fa" />
          <Bar dataKey="Approved" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
