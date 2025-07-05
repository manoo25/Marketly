import React, { useState } from "react";
import { Button } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";
import Sidebar from "./Components/LayoutComponents/Sidebar";
import AddUserModal from "./Components/modalsComponents/UserModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Sidebar />

      <div className="text-end p-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          إضافة مستخدم
        </Button>

        <AddUserModal show={showModal} handleClose={() => setShowModal(false)} />
      </div>
    </>
  );
}

export default App;
