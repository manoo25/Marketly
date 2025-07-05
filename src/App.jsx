import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { } from "./Redux/Slices/Users";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";
import LightButton from "./Components/globalComonents/LightButton";
import PrimaryButton from "./Components/globalComonents/PrimaryButton";
import SecondaryButton from "./Components/globalComonents/SecondaryButton";
import PrimarySearch from "./Components/globalComonents/PrimarySearch";
import DangerButton from "./Components/globalComonents/DangerButton";
import PrimarySelector from "./Components/globalComonents/PrimarySelector";

function App() {

  const [searchVal , setSrearchVal] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(GetCategories());
    console.log(categories);
    
  }, [dispatch]);



  function handleAddCategory() {
    const newCategory = {
      name: "New Category"
    
    };
    dispatch(AddCategory(newCategory));
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul >
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <button onClick={handleAddCategory}>Add Category</button>
      <button onClick={() => dispatch(UpdateCategory({ id: "b06a4961-2a5c-4f5a-b389-fc9a7adf0807", updatedData: { name: "Updated Category" } }))}>
        Update Category
      </button>
      <button onClick={() => dispatch(DeleteCategory("b06a4961-2a5c-4f5a-b389-fc9a7adf0807"))}>
        Delete Category
      </button>
      <button onClick={() => dispatch(DeleteCategory("b06a4961-2a5c-4f5a-b389-fc9a7adf0807"))}>
        Delete Category <span className="fa-brands fa-facebook"></span>
      </button>
      <p>السلام عليكم ورحمة الله وبركاته</p>
      <button className="btn-primary">زر رئيسي</button>
      <button className="btn-secondary">زر ثانوي</button>
      <PrimarySearch label="بحث عن مستخدم" icon="+_+"  value={searchVal} onChange={(val)=>setSrearchVal(val)}/>
      <LightButton label="بحث" onClick={()=>console.log(searchVal)}/>
      <DangerButton label="حذف"/>
      <PrimaryButton label="إضافة مستخدم" />
      <SecondaryButton label="إالغاء"/>
      <PrimarySelector options={[{ value: "admin", label: "أدمن" }, { value: "trader", label: "تاجر" }, { value: "user", label: "عميل" }]} value={selectedRole} onChange={(val)=>setSelectedRole(val)}  />
      <LightButton label="بحث" onClick={()=>console.log(selectedRole)}/>
    </div>
  );
}

export default App;
