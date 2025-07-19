// ✅ AddDelegateModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import PrimaryButton from '../globalComonents/PrimaryButton';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { createDelegate, fetchDelegates } from '../../Redux/Slices/DelegatesSlice';
import { UserRole } from '../../Redux/Slices/token';

/* ───────── ثوابت ───────── */
const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

/* 🗺️ المحافظات الثابتة مبدئيًا
لاحقًا‑ عند تفعيل المحافظات الخاصة بالتاجر ‑
   استبدل هذه المصفوفة بالقيم التى تأتى من الـAPI  */
const governorates = [
    { value: 'gharbia', label: 'الغربية' },
    { value: 'cairo', label: 'القاهرة' },
    { value: 'giza', label: 'الجيزة' },
    { value: 'dakahlia', label: 'الدقهلية' }
];

const AddDelegateModal = () => {
    /* ───────── state & redux ───────── */
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    const [routes, setRoutes] = useState([{ governorate: '', route: '', days: [] }]);
    const [selectedTraderId, setSelectedTraderId] = useState('');
    const [phoneExists, setPhoneExists] = useState(false);

    const dispatch = useDispatch();
    const { users } = useSelector(s => s.Users);
    const { delegates } = useSelector(s => s.Delegates);



    useEffect(() => { dispatch(fetchDelegates()); }, [dispatch]);
      useEffect(() => {
         if (UserRole!='admin') {
         setSelectedTraderId(localStorage.getItem("userID"))
         }
        }, [UserRole]);

    /* ───────── helpers ───────── */
    const checkPhoneUnique = debounce(val => {
        setPhoneExists(delegates.some(d => d.phone === val));
    }, 500);

    /* ───────── validation ───────── */
    const routeSchema = Yup.object().shape({
        governorate: Yup.string(),
        route: Yup.string(),
        days: Yup.array().of(Yup.string())
    }).test(
        'complete-or-empty',
        'يجب اختيار المحافظة ثم كتابة خط السير واختيار الأيام أو ترك الثلاثة فارغين',
        val => {
            const hasGov = !!val.governorate;
            const hasRoute = val.route?.trim() !== '';
            const hasDays = (val.days || []).length > 0;
            return (!hasGov && !hasRoute && !hasDays) || (hasGov && hasRoute && hasDays);
        }
    );

    const validationSchema = Yup.object({
        name: Yup.string().required('الاسم مطلوب'),
        phone: Yup.string().matches(/^[0-9]{10,15}$/, 'رقم غير صالح').required('رقم الهاتف مطلوب'),
        routes: Yup.array().of(routeSchema).test(
            'one-valid',
            'أدخل خط سير واحدًا على الأقل (محافظة + مسار + أيام)',
            arr => arr?.some(r => r.governorate && r.route?.trim() !== '' && r.days?.length)
        )
    });

    /* ───────── formik ───────── */
    const formik = useFormik({
        initialValues: {
            name: '', phone: '', delegateImage: [],
            routes: [{ governorate: '', route: '', days: [] }]
        },
        validationSchema,
        onSubmit: handleAdd
    });

    useEffect(() => {
        if (formik.values.phone) checkPhoneUnique(formik.values.phone);
    }, [formik.values.phone]);

    /* ───────── handlers ───────── */
    async function handleAdd(vals, { resetForm }) {
        if (UserRole=='admin' && !selectedTraderId) {
            alert('اختيار التاجر مطلوب'); return;
        }

        /* رفع الصورة */
        const urls = vals.delegateImage.length
            ? await uploadImagesToSupabase(vals.delegateImage, 'delegates')
            : [];

        const finalTraderId = selectedTraderId ;

        /* تحضير الـ routes الصالحة */
        const validRoutes = routes
            .filter(r => r.governorate && r.route.trim() && r.days.length)
            .flatMap(r => r.days.map(day => ({
                governorate: r.governorate,
                route: r.route,
                day
            })));

        const payload = {
            name: vals.name,
            phone: vals.phone,
            trader_id: finalTraderId,
            image: urls[0] || '',
            routes: validRoutes
        };

        await dispatch(createDelegate(payload)).unwrap();
        resetForm();
        setRoutes([{ governorate: '', route: '', days: [] }]);
        setImages([]); setShow(false);
    }

    /* صورة */
    const handleImageChange = e => {
        const files = Array.from(e.target.files);
        formik.setFieldValue('delegateImage', files);
        setImages(files.map(f => URL.createObjectURL(f)));
    };

    /* routes CRUD */
    const handleAddRoute = () => {
        const newR = [...routes, { governorate: '', route: '', days: [] }];
        setRoutes(newR); formik.setFieldValue('routes', newR);
    };

    const changeGov = (idx, val) => {
        const upd = [...routes]; upd[idx].governorate = val;
        setRoutes(upd); formik.setFieldValue('routes', upd);
    };

    const changeRoute = (idx, val) => {
        const upd = [...routes]; upd[idx].route = val;
        setRoutes(upd); formik.setFieldValue('routes', upd);
        formik.setFieldTouched(`routes[${idx}].route`, true, false);
    };

    const toggleDay = (idx, day) => {
        const upd = [...routes];
        const s = new Set(upd[idx].days);
        s.has(day) ? s.delete(day) : s.add(day);
        upd[idx].days = Array.from(s);
        setRoutes(upd); formik.setFieldValue('routes', upd);
    };

    const removeRoute = idx => {
        const newR = routes.filter((_, i) => i !== idx);
        setRoutes(newR); formik.setFieldValue('routes', newR);
    };

    const handleClose = () => {
        setShow(false); formik.resetForm();
        setRoutes([{ governorate: '', route: '', days: [] }]);
        setImages([]);
    };

    /* ───────── UI ───────── */
    return (
        <>
            <PrimaryButton label="إضافة مندوب" icon="fa-solid fa-user-plus" onClick={() => setShow(true)} />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="justify-content-between">
                    <Modal.Title>إضافة مندوب</Modal.Title>
                    <Button variant="" onClick={handleClose} style={{ fontSize: '1.5rem', border: 'none', background: 'none' }}>&times;</Button>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* الصورة */}
                            <Col md={12} className="mb-3 text-center">
                                <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('delegateImg').click()}>
                                    <img src={images[0] || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="delegate"
                                        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                                <input id="delegateImg" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
                            </Col>

                            {/* الاسم / الهاتف */}
                            <Col md={6} className="mb-3">
                                <Form.Label>اسم المندوب</Form.Label>
                                <Form.Control name="name" value={formik.values.name} onChange={formik.handleChange} />
                                {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Label>رقم الهاتف</Form.Label>
                                <Form.Control name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                                {formik.touched.phone && formik.errors.phone && <div className="text-danger">{formik.errors.phone}</div>}
                                {phoneExists && <div className="text-danger">رقم الهاتف مسجل مسبقًا</div>}
                            </Col>

                            {/* اختيار التاجر (عند الأدمن) */}
                            {UserRole=='admin' && (
                                <Col md={12} className="mb-3">
                                    <Form.Label>اختر التاجر</Form.Label>
                                    <Form.Select value={selectedTraderId} onChange={e => setSelectedTraderId(e.target.value)} required>
                                        <option value="">اختر تاجر</option>
                                        {users.filter(u => (u.role || '').toLowerCase() === 'trader')
                                            .map(u => (<option key={u.id} value={u.id}>{u.name}</option>))}
                                    </Form.Select>
                                    {!selectedTraderId && <div className="text-danger mt-1">اختيار التاجر مطلوب</div>}
                                </Col>
                            )}

                            {/* خطوط السير */}
                            <Col md={12}>
                                <Form.Label>خط السير</Form.Label>

                                {routes.map((r, idx) => (
                                    <div key={idx} className="mb-3 border p-3 rounded position-relative">
                                        {idx > 0 && (
                                            <button type="button" title="حذف المسار"
                                                onClick={() => removeRoute(idx)}
                                                style={{
                                                    position: 'absolute', top: 10, left: 10, width: 30, height: 30,
                                                    background: '#dc3545', color: '#fff', border: 'none',
                                                    borderRadius: 5, fontWeight: 700, cursor: 'pointer'
                                                }}
                                            >×</button>
                                        )}

                                        <Row className="g-2">
                                            <Col md={4}>
                                                <Form.Select
                                                    value={r.governorate}
                                                    onChange={e => changeGov(idx, e.target.value)}
                                                >
                                                    <option value="">المحافظة</option>
                                                    {governorates.map(g => (
                                                        <option key={g.value} value={g.value}>{g.label}</option>
                                                    ))}
                                                </Form.Select>
                                            </Col>

                                            <Col md={8}>
                                                <Form.Control placeholder="أدخل خط السير"
                                                    value={r.route} onChange={e => changeRoute(idx, e.target.value)} />
                                            </Col>
                                        </Row>

                                        {/* الأيام */}
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {daysOfWeek.map(day => {
                                                const sel = r.days.includes(day);
                                                const disable = !(r.governorate && r.route.trim());
                                                return (
                                                    <div key={day}
                                                        onClick={() => !disable && toggleDay(idx, day)}
                                                        style={{
                                                            padding: '6px 12px', borderRadius: 20,
                                                            backgroundColor: disable ? '#e9ecef' : sel ? '#0d6efd' : '#f1f1f1',
                                                            color: disable ? '#777' : sel ? '#fff' : '#333',
                                                            cursor: disable ? 'not-allowed' : 'pointer', fontSize: '0.9rem'
                                                        }}>
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* أخطاء المسار الأول / العامة */}
                                        {idx === 0 && typeof formik.errors.routes === 'string' && (
                                            <div className="text-danger mt-2">{formik.errors.routes}</div>
                                        )}
                                    </div>
                                ))}

                                <Button variant="secondary" onClick={handleAddRoute}>إضافة خط سير</Button>
                            </Col>

                            <Col md={12} className="mt-3">
                                <Button type="submit" className="w-100 btn-primary">تأكيد</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddDelegateModal;
