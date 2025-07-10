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

function App() {
  const routes = createBrowserRouter([
    { path: '/', element: <Layout /> },
    { path: 'Landing', element: <Landing /> },
    {
      path: 'Dashboard',
      element: <Layout />,
      children: [
        { path: 'Charts', element: <Charts /> },
        { path: 'Products', element: <Products /> },
        { path: 'Products/MostSelling', element: <MostSellingTbl /> },
        { path: 'Categories', element: <Categories /> },
        { path: 'Users', element: <Users /> },
        { path: 'Orders', element: <Orders /> },
        { path: 'companies', element: <Companies /> },
        { path: 'Returns', element: <Returns /> },
       ]
    },
    { path: 'SignUp', element: <SignUpPage /> },
    { path: 'SigninPage', element: <SigninPage /> },
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
