
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Products from "./Pages/ProductsPage";
import Users from "./Pages/UsersPage";
import Orders from "./Pages/Orders";
import Charts from "./Pages/Charts";
import Categories from "./Pages/CategoriesPage";
import Companies from './Pages/Companies';
import SignUp from "./Pages/auth/SignUp";
import SigninPage from "./Pages/auth/SignIn"
import SignUpPage from "./Pages/auth/SignUp";



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
  {path:'SignUp',element:<SignUpPage/>},
     {path:'SigninPage',element:<SigninPage/>},
])


  return (
    <>
  <RouterProvider router={routes}/>
   {/* <RouterProvider router={routes}/> */}
 
   
    </>
  );
}

export default App;