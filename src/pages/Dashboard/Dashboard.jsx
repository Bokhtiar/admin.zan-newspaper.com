import React from "react";
import Card from "./card/Card";
import CalendarComponent from "./calender/Calender";
import RecentOrderChart from "./Chart/RecentOrderChart";
import EarningsChart from "./Chart/EarningsChart";
import ShowTable from "./table/ShowTable";
import { MyCalendar } from "./calender/MyCalendar";

const Dashboard = () => {
  return (
    <div className="mt-5">
      <Card />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 mt-8">
        <div className="col-span-4 ">
          <CalendarComponent />
          {/* <MyCalendar/> */}
        </div>
        <div className="col-span-4">
          <RecentOrderChart />
        </div>
      </div>
      <div className="w-1/2 mt-5">
        <EarningsChart />
      </div>
      <div className="mt-6">
        <ShowTable />
      </div>
    </div>
  );
};

export default Dashboard;
