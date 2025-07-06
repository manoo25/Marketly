import React, { useState } from "react";
import { Button } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";
import Sidebar from "./Components/LayoutComponents/Sidebar";
  
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Sidebar />
 
    </>
  );
}

export default App;
