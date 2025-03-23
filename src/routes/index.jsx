import { Navigate } from "react-router-dom";
// import { Dashboard } from '../components/dashboard'
import { CategoryList } from "../pages/category/index";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Dashboard } from "../pages/Dashboard";
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

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // dashboard
      { path: "", element: <Dashboard /> },

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
      { path: "edit-news/:newsId", element: <EditNews /> },
      { path: "single-content/:id", element: <SingleContent /> },
      // single add image
      { path: "singleaddimage", element: <SingleItemList /> },
      { path: "create-singleaddimage", element: <CreateAddImage /> },
      /** home */
      { path: "home-news", element: <HomePage/> },
      { path: "create-homenews", element: <CreateHomePage/> },
      { path: "edit-homenews/:id", element: <EditHomePage/> },

      // /** product */
      // { path: "product", element:  <Product /> },
      // { path: "product/category", element:  <Product /> },
      // { path: "product/product-list", element:  <ProductList/>},
      // { path: "product/add-product", element:  <AddProduct/>},
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
