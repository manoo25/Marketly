import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { } from "./Redux/Slices/Users";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from "./Redux/Slices/Categories";

function App() {

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
    </div>
  );
}

export default App;
