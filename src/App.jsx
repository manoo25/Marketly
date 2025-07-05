import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { } from "./Redux/Slices/Users";
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
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <button onClick={handleAddCategory}>Add Category</button>
      <button onClick={() => dispatch(UpdateCategory({ id: "551ccc41-5a24-4fda-862d-640728295584", updatedData: { name: "Updated Category" } }))}>
        Update Category
      </button>
      <button onClick={() => dispatch(DeleteCategory("551ccc41-5a24-4fda-862d-640728295584"))}>
        Delete Category
      </button>
    </div>
  );
}

export default App;
