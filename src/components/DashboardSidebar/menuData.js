import { RxDashboard } from "react-icons/rx";
import { HiBars3 } from "react-icons/hi2";
import { MdNewspaper } from "react-icons/md";
import { FaAddressCard, FaImage } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

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
    icon: <FaPerson />,
    path: "/dashboard/author",
  },
  {
    title: "News",
    icon: <MdNewspaper />,
    path: "/dashboard/news",
  },
  {
    title: "Home Page",
    icon: <IoHome />,
    path: "/dashboard/home-news",
  },
  {
    title: "Single add image",
    icon: <FaImage />,
    path: "/dashboard/create-singleaddimage",
  },
  {
    title: "Hero Page",
    icon: <FaAddressCard />,
    path: "/dashboard/hero",
  },
];
