// ✅ الصفحة 1: صفحة عرض المناديب (DelegatesPage.js)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDelegates, updateDelegate, deleteDelegate } from "../Redux/Slices/DelegatesSlice";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import DelegatesPageHeader from "../Components/DelegatesComponents/DelegatesPageHeader";
import DelegatesFilter from "../Components/DelegatesComponents/DelegatesFilter";
import DelegatesTbl from "../Components/DelegatesComponents/DelegatesTbl";
import { fetchUsers } from "../Redux/Slices/Users";
import EditDelegateModal from "../Components/modalsComponents/EditDelegateModal";
import Loading from "../Components/globalComonents/loading";


export default function DelegatesPage() {
    const dispatch = useDispatch();
    const { delegates, loading } = useSelector((state) => state.Delegates);
        const { users } = useSelector(state => state.Users);
 
   
    useEffect(() => {
       dispatch(fetchDelegates());
        if (users.length === 0) {
                            dispatch(fetchUsers());
                        }
    }, [dispatch, users]);


    const [searchName, setSearchName] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [selectedGovernorate, setSelectedGovernorate] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [searchTrader, setSearchTrader] = useState("");
    const [filters, setFilters] = useState({ governorate: '', name: '', phone: '', day: '' });
    const [editModalData, setEditModalData] = useState(null);

    const handleSearchClick = () => {
        setFilters({
            governorate: selectedGovernorate,
            name: searchName,
            phone: searchPhone,
            day: selectedDay,
            trader: searchTrader,
        });
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                name: searchName,
                phone: searchPhone,
                trader: searchTrader
            }));
        }, 500);

        return () => clearTimeout(delay);
    }, [searchName, searchPhone, searchTrader]);
    

    const handleResetFilters = () => {
        setSearchName("");
        setSearchPhone("");
        setSelectedGovernorate("");
        setSelectedDay("");
        setSearchTrader("");
        setFilters({ governorate: '', name: '', phone: '', day: '', trader: '' });
    };

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

    const handleUpdateDelegate = (id, updatedData) => {
        dispatch(updateDelegate({ id, updatedData }));
    };



    const handleDeleteDelegate = async (id) => {
        try {
            await dispatch(deleteDelegate(id)).unwrap();
            setToastMessage("تم حذف المندوب بنجاح");
            setToastVariant("success");
        } catch {
            setToastMessage("حدث خطأ أثناء الحذف");
            setToastVariant("danger");
        } finally {
            setShowToast(true);
        }
    };

    // ✅ فلترة المناديب حسب الاسم أو التليفون أو المحافظة أو اليوم داخل الروتس
    const filteredDelegates = delegates.filter(delegate => {
        const matchesName = filters.name === "" || delegate.name?.includes(filters.name);
        const matchPhone = searchPhone ? delegate.phone.includes(searchPhone) : true;
        const trader = users.find(user => user.id === delegate.trader_id);
        const matchesTraderName = filters.trader === "" || trader?.name?.includes(filters.trader);

        const matchesGovernorate =
            filters.governorate === '' ||
            delegate.routes?.some(r => r.governorate.toLowerCase() === filters.governorate.toLowerCase());

        const matchesDay =
            filters.day === "" // بدون فلتر
            || (filters.day === "ALL_DAYS" && delegate.routes?.length === 7) // كل الأيام
            || delegate.routes?.some(route => route.day === filters.day); // يوم معين

        return matchesName && matchPhone && matchesGovernorate && matchesDay && matchesTraderName;;
    });

    return (
        <>
            <DelegatesPageHeader users = {users}/>
            <DelegatesFilter
                searchName={searchName}
                setSearchName={setSearchName}
                searchPhone={searchPhone}
                setSearchPhone={setSearchPhone}
                searchTrader={searchTrader}
                setSearchTrader={setSearchTrader}
                selectedGovernorate={selectedGovernorate}
                setSelectedGovernorate={setSelectedGovernorate}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                onSearchClick={handleSearchClick}
                onResetFilters={handleResetFilters}
            />

            {loading ? (
                // <div className="text-center py-5">
                //     <div className="spinner-border text-primary" role="status">
                //         <span className="visually-hidden">Loading...</span>
                //     </div>
                // </div>
                <Loading/>
            ) : (
                <DelegatesTbl
                    delegates={filteredDelegates}
                    selectedGovernorate={filters.governorate}
                    searchName={filters.name}
                    searchPhone={filters.phone}
                    selectedDay={filters.day}
                    onUpdateDelegate={handleUpdateDelegate}
                    setEditModalData={setEditModalData}
                    onDeleteDelegate={handleDeleteDelegate}
                    users={users}
                />
            )}
            {
                editModalData && (
                    <EditDelegateModal
                        show={!!editModalData}
                        delegate={editModalData}
                        users={users}
                        onClose={() => setEditModalData(null)}
                        onUpdateSuccess={() => {
                            setToastMessage("تم تعديل بيانات المندوب بنجاح");
                            setToastVariant("success");
                            setShowToast(true);
                            setEditModalData(null);
                        }}
                        onUpdateFail={() => {
                            setToastMessage("فشل في تعديل بيانات المندوب");
                            setToastVariant("danger");
                            setShowToast(true);
                        }}
                    />

                )
            }

            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 999999 }}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
                    <Toast.Header>
                        <strong className="ms-auto">رسالة النظام</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
