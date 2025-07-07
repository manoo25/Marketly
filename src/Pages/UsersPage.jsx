import React, { useEffect, useState } from "react";
import UsersTbl from "../Components/UsersComponents/UsersTbl";
import UsersFilter from "../Components/UsersComponents/UsersFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Redux/Slices/Users";
import PrimaryButton from "../Components/globalComonents/PrimaryButton";
import { updateUser, deleteUser } from "../Redux/Slices/Users";
import HeaderComponent from "../Components/UsersComponents/HeaderComponent";



export default function UsersPage() {
    
    // فنكشن الحظر
    const handleToggleBlock = (user) => {
        dispatch(updateUser({ id: user.id, updatedData: { isBlocked: !user.isBlocked } }));
    };
    
    // فنكشن الحذف
    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    // getting user from store and subabase
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUsers());
    }, [dispatch])

    const { users, loading } = useSelector((state) => state.Users);


    // getting user from store and subabase

    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");

    const [selectedGovernorate, setSelectedGovernorate] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [filters, setFilters] = useState({
        governorate: '',
        role: '',
        name: '',
        email: '',
    });

    const handleSearchClick = () => {
        setFilters({
            governorate: selectedGovernorate,
            role: selectedRole,
            name: searchName,
            email: searchEmail,
        });
    };

    return (
        <>  
            <HeaderComponent/>
            <UsersFilter 
                
                searchName={searchName}
                setSearchName={setSearchName}

                searchEmail={searchEmail}
                setSearchEmail={setSearchEmail}

                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}

                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}

                onSearchClick={handleSearchClick}/>
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <UsersTbl
                    users={users}
                    selectedGovernorate={filters.governorate}
                    selectedRole={filters.role}
                    searchName={filters.name}
                    searchEmail={filters.email}
                    onDeleteUser={handleDeleteUser}
                    onBlockUser={handleToggleBlock}
                />
            )}
        </>
    )
}