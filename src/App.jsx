
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./Components/LayoutComponents/Sidebar";
import Layout from "./Pages/Layout";
import Products from "./Pages/ProductsPage";
import Users from "./Pages/UsersPage";
import Orders from "./Pages/Orders";




function App() {
let routes= createBrowserRouter([
  {path:'/',element:<Layout></Layout>},
  {path:'Dashboard',element:<Layout></Layout>,children:[
     {path:'Products',element:<Products></Products>},
     {path:'Users',element:<Users></Users>},
     {path:'Orders',element:<Orders></Orders>},
  ]},
])
  
  return (
    <>
   <RouterProvider router={routes}/>
    </>
  );
}

export default App;