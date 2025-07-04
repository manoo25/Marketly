import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, fetchUsers } from "./Redux/Slices/Users";

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.Users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      console.log(users);
    }
  }, [users]);

  function handleAddUser() {
    const newUser = {
      name: "Tarek",
      email: "mohamedsalama45489@gmail.com",
      password: "3250894",
      location: "Sakha",
      role: "admin",
    };

    dispatch(createUser(newUser));
  }

  return (
    <>
      <p>Hello Marketly</p>
      <button onClick={handleAddUser}>Add User</button>
      <button
        onClick={() =>
          dispatch(deleteUser("aaf589d0-2ac9-45d5-b3fb-0710ad9faa07"))
        }
      >
        Delete User
      </button>
    </>
  );
}

export default App;
