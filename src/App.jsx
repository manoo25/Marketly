
import { Button } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";
import Sidebar from "./Components/LayoutComponents/Sidebar";
import AllGlobalCopm from "./Pages/AllGlobalCopm";
import UsersTbl from "./Components/UsersComponents/UsersTbl";

function App() {


  return (
    <>
   <Sidebar/>
    </>
  );
}

export default App;