import { useEffect, useState } from "react";


export const Dashboard = () => {
  return (
    <>
<TotalOrders/>

    </>
  );
};
const TotalOrders = () => {
  const [totalSales, setTotalSales] = useState(15000);
  const [totalOrderAmount, setTotalOrderAmount] = useState(30000);
  const [averageOrderValue, setAverageOrderValue] = useState(0);

  // Calculate average order value
  useEffect(() => {
    if (totalOrderAmount > 0) {
      setAverageOrderValue(totalSales / totalOrderAmount);
    }
  }, [totalSales, totalOrderAmount]);

  return (
    <div>
      <h1 className="text-3xl mt-10 font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to the admin panel.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold mt-2">${totalSales.toLocaleString()}</p>
        </div>

        <div className="bg-orange-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Order Amount</h2>
          <p className="text-2xl font-bold mt-2">${totalOrderAmount.toLocaleString()}</p>
        </div>

        <div className="bg-orange-500 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Average Order Value</h2>
          <p className="text-2xl font-bold mt-2">${averageOrderValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
