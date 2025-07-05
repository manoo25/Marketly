
import { } from "./Redux/Slices/Users";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";
import Sidebar from "./Components/LayoutComponents/Sidebar";

function App() {
  
  return (
   <Sidebar></Sidebar>
  );
}

export default App;
