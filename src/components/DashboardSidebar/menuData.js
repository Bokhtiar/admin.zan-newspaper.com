import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import { MdNewspaper } from "react-icons/md";

export const menuData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    title: "Category",
    icon: <HiBars3 />,
    path: "/dashboard/category",
  },
  {
    title: "Author",
    icon: <HiBars3 />,
    path: "/dashboard/author",
  },
  {
    title: "News",
    icon: <MdNewspaper />,
    path: "/dashboard/news",
  },

];
