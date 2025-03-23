import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashboardSidebar/DashboardSidebar";
import {Header} from '../components/dashboardNavbar/index'


import { useState } from "react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="bg-white dark:bg-gray-500 text-black dark:text-white"> 
      <div className="flex h-screen overflow-hidden ">
        {/* sidbar start  */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1  flex-col overflow-y-auto overflow-x-hidden">
          {/* Header start  */}
          <Header  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl px-2 m-5">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
  </div>
);
};
