import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import SigninPage from "./Pages/auth/SignIn";

import Landing from "./Pages/landingPage";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetToken } from "./Redux/Slices/token";
import ProtectedDashboardRoute from "./Components/Authcomponent/protecteddashboardroute";
import ProtectedAuthRoute from "./Components/Authcomponent/protectedauthroute";
import Loading from "./Components/globalComonents/loading";
import NotFound from "./Components/Notfound/NotFound";

// ✅ Lazy Loaded Pages & Components
const Layout = lazy(() => import("./Pages/Layout"));
const Products = lazy(() => import("./Pages/ProductsPage"));
const Users = lazy(() => import("./Pages/UsersPage"));
const Orders = lazy(() => import("./Pages/Orders"));
const Charts = lazy(() => import("./Pages/Charts"));
const Categories = lazy(() => import("./Pages/CategoriesPage"));
const Companies = lazy(() => import("./Pages/Companies"));
const Returns = lazy(() => import("./Pages/Returns"));
const SignUpPage = lazy(() => import("./Pages/auth/SignUp"));
const MostSellingTbl = lazy(() =>
  import("./Components/ProductsComponents/MostSellingTbl")
);
const MostSellingProducts = lazy(() =>
  import("./Pages/Products/MostSellingProducts")
);
const DelegatesPage = lazy(() => import("./Pages/DelegatesPage"));
const ChooseRole = lazy(() => import("./Pages/auth/ChooseRole"));
const CheckDelegates = lazy(() => import("./Pages/auth/CheckDelegates"));
const Sales = lazy(() => import("./Pages/Sales"));
const UploadShopImage = lazy(() => import("./Pages/auth/UploadShopImage"));
const Complaints = lazy(() => import("./Pages/Complaints"));
const GoogleUserRoute = lazy(() => import("./Pages/auth/GoogleUserRoute"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetToken());
  }, []);

  const routes = createBrowserRouter([
    {
      path: "Dashboard",
      element: (
        <ProtectedDashboardRoute>
          <Layout />
        </ProtectedDashboardRoute>
      ),
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
    {
      path: "SignUp",
      element: (
        <ProtectedAuthRoute>
          <SignUpPage />
        </ProtectedAuthRoute>
      ),
    },
    { path: "/", element: <Landing /> },
    { path: "Landing", element: <Landing /> },
    {
      path: "SigninPage",
      element: (
        <ProtectedAuthRoute>
          <SigninPage />
        </ProtectedAuthRoute>
      ),
    },
    { path: "google-setup", element: <GoogleUserRoute /> },
    {
      path: "choose-role",
      element: (
        <ProtectedAuthRoute>
          <ChooseRole />
        </ProtectedAuthRoute>
      ),
    },
    { path: "check-delegates", element: <CheckDelegates /> },
    { path: "/upload-shop-image", element: <UploadShopImage /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
