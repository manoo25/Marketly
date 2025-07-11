
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ModalConfirm from '../UsersComponents/ModalConfirm';
import RouteDetailsModal from '../DelegatesComponents/RouteDetailsModal';
import CustomMenu from '../globalComonents/CustomMenu';
import LabeledMenu from '../globalComonents/LabeledMenu';
import '../../css/Table.css';

const rowsPerPage = 10;

/* يجمّع الأيام اللى ليها نفس خط السير */
const groupRoutes = (arr = []) =>
    arr.reduce((acc, cur) => {
        const f = acc.find(r => r.route === cur.route);
        f ? !f.days.includes(cur.day) && f.days.push(cur.day)
            : acc.push({ route: cur.route, days: [cur.day] });
        return acc;
    }, []);

export default function DelegatesTbl({
    users, delegates,
    searchName, searchPhone, selectedGovernorate, selectedDay,
    onDeleteDelegate, setEditModalData
}) {

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(delegates.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const currentDelegates = delegates.slice(startIdx, startIdx + rowsPerPage);

    useEffect(() => setCurrentPage(1),
        [searchName, searchPhone, selectedGovernorate, selectedDay, users]);

    /* اختيار الصفوف */
    const [selectedIds, setSelectedIds] = useState([]);
    const handleSelectAll = e => {
        const pageIds = currentDelegates.map(d => d.id);
        setSelectedIds(prev =>
            e.target.checked ? [...new Set([...prev, ...pageIds])]
                : prev.filter(id => !pageIds.includes(id))
        );
    };

    /* مودال الحذف */
    const [confirmModal, setConfirmModal] = useState({
        open: false, message: '', confirmText: '', confirmClass: '', onConfirm: () => { }
    });

    /* مودال عرض الخطوط */
    const [showRoutesModal, setShowRoutesModal] = useState(false);
    const [modalRoutes, setModalRoutes] = useState([]);
    const [modalName, setModalName] = useState('');   // 🆕

    const openRoutesModal = (grouped, name) => {                  // 🆕
        setModalRoutes(grouped);
        setModalName(name);
        setShowRoutesModal(true);
    };

    /* ---------- UI ---------- */
    return (
        <>
            <div className="user-table">
                <table className="table" width="100%" dir="rtl">
                    <thead>
                        <tr>
                            <th>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox"
                                        checked={currentDelegates.length > 0 &&
                                            currentDelegates.every(d => selectedIds.includes(d.id))}
                                        onChange={handleSelectAll} />
                                </label>
                            </th>
                            <th>الصورة</th><th>اسم المندوب</th><th>رقم الهاتف</th>
                            <th>التاجر التابع له</th><th>المحافظة</th><th>خط السير</th>
                            <th>
                                <LabeledMenu id="bulkActions" label="إجراءات جماعية"
                                    options={[{
                                        label: 'حذف المناديب', icon: 'fa-solid fa-trash', color: 'red',
                                        onClick: () => {
                                            if (!selectedIds.length) return alert('اختر على الأقل مندوب واحد');
                                            setConfirmModal({
                                                open: true,
                                                message: `هل أنت متأكد من حذف ${selectedIds.length} مندوب؟`,
                                                confirmText: 'نعم، احذف', confirmClass: 'btn-danger',
                                                onConfirm: () => {
                                                    selectedIds.forEach(onDeleteDelegate);
                                                    setSelectedIds([]); setConfirmModal(p => ({ ...p, open: false }));
                                                }
                                            });
                                        }
                                    }]} />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentDelegates.map(delegate => {
                            const grouped = groupRoutes(delegate.routes);
                            const first = grouped[0];

                            return (
                                <tr key={delegate.id}>
                                    {/* check‑box */}
                                    <td><label className="checkbox-wrapper">
                                        <input type="checkbox"
                                            checked={selectedIds.includes(delegate.id)}
                                            onChange={e => setSelectedIds(prev =>
                                                e.target.checked ? [...prev, delegate.id]
                                                    : prev.filter(id => id !== delegate.id))} />
                                    </label></td>

                                    {/* صورة */}
                                    <td><img
                                        src={delegate.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                        alt={delegate.name}
                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} /></td>

                                    <td>{delegate.name}</td>
                                    <td>{delegate.phone}</td>
                                    <td>{users.find(u => u.id === delegate.trader_id)?.name || '---'}</td>
                                    <td>{users.find(u => u.id === delegate.trader_id)?.governorate || 'غير محددة'}</td>

                                    {/* خط السير + العين */}
                                    <td style={{ position: 'relative' }}>
                                        {first ? (
                                            <div className="d-flex justify-content-center align-items-center position-relative">
                                                {/* محتوى خط السير في المنتصف */}
                                                <div className="text-center">
                                                    <div className="fw-bold">{first.route}</div>
                                                    <div className="mb-1">
                                                        {first.days.map((d, i) => (
                                                            <Badge bg="info" key={i} className="me-1 badge-sm">{d}</Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* أيقونة العين في نفس المكان في كل الصفوف */}
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        top: '50%',
                                                        left: -30,
                                                        transform: 'translateY(-50%)',
                                                        width: 32,
                                                        height: 32,
                                                        backgroundColor: grouped.length > 1 ? '#e7f1ff' : '#f0f0f0',
                                                        color: grouped.length > 1 ? '#0d6efd' : '#999',
                                                        cursor: grouped.length > 1 ? 'pointer' : 'default',
                                                        fontSize: '1rem',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    title={grouped.length > 1 ? 'عرض كل الخطوط' : 'لا توجد خطوط إضافية'}
                                                    onClick={() => grouped.length > 1 && openRoutesModal(grouped, delegate.name)}
                                                >
                                                    <i className="fa-solid fa-eye"></i>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-muted">لا يوجد</span>
                                        )}
                                    </td>


                                    {/* قائمة الإجراءات */}
                                    <td><CustomMenu id={delegate.id} options={[
                                        {
                                            label: 'تعديل', icon: 'fa-solid fa-pen', color: 'blue',
                                            onClick: () => setEditModalData(delegate)
                                        },
                                        // {
                                        //     label: 'عرض كل الخطوط', icon: 'fa-solid fa-eye', color: 'teal',
                                        //     onClick: () => openRoutesModal(grouped, delegate.name)
                                        // },
                                        {
                                            label: 'حذف المندوب', icon: 'fa-solid fa-trash', color: 'red',
                                            onClick: () => setConfirmModal({
                                                open: true,
                                                message: `هل أنت متأكد من حذف (${delegate.name})؟`,
                                                confirmText: 'نعم، احذف', confirmClass: 'btn-danger',
                                                onConfirm: () => {
                                                    onDeleteDelegate(delegate.id);
                                                    setConfirmModal(p => ({ ...p, open: false }));
                                                }
                                            })
                                        }
                                    ]} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* مودال عرض الخطوط مع اسم المندوب */}
            <RouteDetailsModal
                show={showRoutesModal}
                onClose={() => setShowRoutesModal(false)}
                routes={modalRoutes}
                delegateName={modalName}          /* 🆕 */
            />

            {/* Pagination */}
            <div className="pagination mt-4">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    &laquo;
                </button>
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    &raquo;
                </button>
            </div>

            {/* Confirm‑modal */}
            <ModalConfirm
                isOpen={confirmModal.open}
                onClose={() => setConfirmModal(p => ({ ...p, open: false }))}
                onConfirm={confirmModal.onConfirm}
                message={confirmModal.message}
                confirmText={confirmModal.confirmText}
                confirmClass={confirmModal.confirmClass}
            />
        </>
    );
}
