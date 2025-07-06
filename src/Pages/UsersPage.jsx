import React, { useState } from "react";
import UsersTbl from "../Components/UsersComponents/UsersTbl";
import UsersFilter from "../Components/UsersComponents/UsersFilter";


export default function UsersPage() {
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
            <UsersTbl
                selectedGovernorate={filters.governorate}
                selectedRole={filters.role}
                searchName = {filters.name}
                searchEmail = {filters.email}
            />
        </>
    )
}