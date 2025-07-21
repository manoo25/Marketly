import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Products from "./Pages/ProductsPage";
import Users from "./Pages/UsersPage";
import Orders from "./Pages/Orders";
import Charts from "./Pages/Charts";
import Categories from "./Pages/CategoriesPage";
import Companies from "./Pages/Companies";
import Returns from "./Pages/Returns";
import SigninPage from "./Pages/auth/SignIn";
import SignUpPage from "./Pages/auth/SignUp";
import Landing from "./Pages/landingPage";
import MostSellingTbl from "./Components/ProductsComponents/MostSellingTbl";
import MostSellingProducts from "./Pages/Products/MostSellingProducts";
import DelegatesPage from "./Pages/DelegatesPage";
import ChooseRole from "./Pages/auth/ChooseRole";
import CheckDelegates from "./Pages/auth/CheckDelegates";
import Sales from "./Pages/Sales";

// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { GetToken } from "./Redux/Slices/token";

import UploadShopImage from "./Pages/auth/UploadShopImage";
import Complaints from "./Pages/Complaints";
import GoogleUserRoute from "./Pages/auth/GoogleUserRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "Dashboard",
      element: <Layout />,
      children: [
        { path: "Charts", element: <Charts /> },
        { path: "Products", element: <Products /> },
        { path: "Products/MostSelling", element: <MostSellingTbl /> },
        {
          path: "Products/MostSellingProducts",
          element: <MostSellingProducts />,
        },
        { path: "Categories", element: <Categories /> },
        { path: "Users", element: <Users /> },
        { path: "Orders", element: <Orders /> },
        { path: "companies", element: <Companies /> },
        { path: "Returns", element: <Returns /> },
        { path: "Sales", element: <Sales /> },
        { path: "Delegates", element: <DelegatesPage /> },
        { path: "Complaints", element: <Complaints /> },
      ],
    },
    { path: "SignUp", element: <SignUpPage /> },
    // { path: '/', element: <SigninPage /> },
    { path: "/", element: <Landing /> },
    { path: "Landing", element: <Landing /> },
    { path: "SigninPage", element: <SigninPage /> },
    { path: "google-setup", element: <GoogleUserRoute /> },
    { path: "choose-role", element: <ChooseRole /> },
    { path: "check-delegates", element: <CheckDelegates /> },
    { path: "/upload-shop-image", element: <UploadShopImage /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
