
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Products from "./Pages/ProductsPage";
import Users from "./Pages/UsersPage";
import Orders from "./Pages/Orders";
import Charts from "./Pages/Charts";
import Categories from "./Pages/CategoriesPage";
import Companies from './Pages/Companies';




function App() {
let routes= createBrowserRouter([
  {path:'/',element:<Layout></Layout>},
  {path:'Dashboard',element:<Layout></Layout>,children:[
     {path:'Charts',element:<Charts></Charts>},
     {path:'Products',element:<Products></Products>},
     {path:'Categories',element:<Categories></Categories>},
     {path:'Users',element:<Users></Users>},
     {path:'Orders',element:<Orders></Orders>},
     {path:'companies',element:<Companies></Companies>},
  ]},
])


  return (
    <>
  <RouterProvider router={routes}/>
    </>
  );
}

export default App;