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
import MostSellingProducts from "./Pages/Products/MostSellingProducts";
import DelegatesPage from "./Pages/DelegatesPage";

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
        { path: 'Products/MostSellingProducts', element: <MostSellingProducts /> },
        { path: 'Categories', element: <Categories /> },
        { path: 'Users', element: <Users /> },
        { path: 'Orders', element: <Orders /> },
        { path: 'companies', element: <Companies /> },
        { path: 'Returns', element: <Returns /> },
        { path: 'Delegates', element: <DelegatesPage /> },
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
