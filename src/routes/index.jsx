import { Navigate } from "react-router-dom";

import { CategoryList } from "../pages/category/index";
import { DashboardLayout } from "../layouts/dashboard.layout";

import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";
import CreateNews from "../pages/news/CreateNews";
import { NewsList } from "../pages/news";
import EditNews from "../pages/news/EditNews";
import { AuthorList } from "../pages/author";
import CreateAuthor from "../pages/author/CreateAuthor";
import EditAuthor from "../pages/author/EditAuthor";
import CreateAddImage from "../pages/singleAddImage/CreateAddImage";
import SingleItemList from "../pages/singleAddImage";
import SingleContent from "../pages/news/SingleContent";
import HomePage from "../pages/homePage";
import CreateHomePage from "../pages/homePage/CreateHomePage";
import EditHomePage from "../pages/homePage/EditHomePage";


import CreateHero from "../pages/hero/CreateHero";
import EditHero from "../pages/hero/EditHero";
import { HeroList } from "../pages/hero";
import Dashboard from "../pages/Dashboard/Dashboard";
import Seo from "../pages/news/Seo";
import CreateSeo from "../pages/seo/createSeo";
import { SeoList } from "../pages/seo";


const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // dashboard
      { index:true, element: <Dashboard /> },

      /** category */
      { path: "category", element: <CategoryList /> },
      { path: "create-category", element: <CreateCategory /> },
      { path: "edit-category/:categoryId", element: <EditCategory /> },
      /** author */
      { path: "author", element: <AuthorList /> },
      { path: "create-author", element: <CreateAuthor /> },
      { path: "edit-author/:authorId", element: <EditAuthor /> },
      /** news */
      { path: "news", element: <NewsList /> },
      { path: "create-news", element: <CreateNews /> },
      { path: "edit-news/:id", element: <EditNews /> },
      { path: "single-content/:id", element: <SingleContent /> },
      { path: "seo/:id", element: <Seo/> },
      // single add image
      { path: "singleaddimage", element: <SingleItemList /> },
      { path: "create-singleaddimage", element: <CreateAddImage /> },
      // { path: "edit-singleaddimage/:id", element: <EditAddImage/> },
      /** home */
      { path: "home-news", element: <HomePage/> },
      { path: "create-homenews", element: <CreateHomePage/> },
      { path: "edit-homenews/:id", element: <EditHomePage/> },
      /** hero */
      { path: "hero", element: <HeroList/> },
      { path: "create-hero", element: <CreateHero/> },
      { path: "edit-hero/:id", element: <EditHero/> },

      /** hero */
      { path: "seoList", element: <SeoList/> },
      { path: "seo", element: <CreateSeo/> },


    ],
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  // const token = getToken();
  // if (token) {
  //     return appRoutes;
  // }
  return appRoutes;
  return [];
};
