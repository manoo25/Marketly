import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import PrimaryButton from '../globalComonents/PrimaryButton';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { createDelegate, fetchDelegates } from '../../Redux/Slices/DelegatesSlice';

const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

const AddDelegateModal = () => {
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);
    const [routes, setRoutes] = useState([{ route: '', days: [] }]);
    const [selectedTraderId, setSelectedTraderId] = useState('');
    const [phoneExists, setPhoneExists] = useState(false);

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.Users);
    const { delegates } = useSelector((state) => state.Delegates);

    const isAdmin = true;
    const currentTraderId = 'fake-trader-id';

    // 🔓 عند تشغيل النظام الحقيقي، فعّل الأسطر التالية بدل الموجود فوق:
    //
    // const { authUser } = useSelector(state => state.Auth);
    // const isAdmin = authUser?.role === 'admin';
    // const currentTraderId = authUser?.id;


    useEffect(() => {
        dispatch(fetchDelegates());
    }, [dispatch]);

    const checkPhoneUnique = debounce((val) => {
        setPhoneExists(delegates.some((d) => d.phone === val));
    }, 500);

    const validationSchema = Yup.object({
        name: Yup.string().required('الاسم مطلوب'),
        phone: Yup.string()
            .matches(/^[0-9]{10,15}$/, 'رقم غير صالح')
            .required('رقم الهاتف مطلوب'),
        routes: Yup.array()
            .of(
                Yup.object().shape({
                    route: Yup.string(),
                    days: Yup.array().of(Yup.string())
                }).test(
                    'complete-or-empty',
                    'يجب إدخال خط السير واختيار أيام أو تركهما فارغين',
                    (value) => {
                        const hasRoute = value.route?.trim() !== '';
                        const hasDays = (value.days || []).length > 0;
                        return (!hasRoute && !hasDays) || (hasRoute && hasDays);
                    }
                )
            )
            .test(
                'at-least-one-filled',
                'يجب إدخال خط سير واحد على الأقل مع الأيام',
                (routes) => routes?.some((r) => r.route?.trim() !== '' && r.days?.length > 0)
            )
    });

    async function handleAddDelegate(values, { resetForm }) {
        try {
            if (isAdmin && !selectedTraderId) {
                alert('اختيار التاجر مطلوب');
                return;
            }

            const imageUrls = values.delegateImage.length
                ? await uploadImagesToSupabase(values.delegateImage, 'delegates')
                : [];

            const finalTraderId = isAdmin ? selectedTraderId : currentTraderId;
            const expandedRoutes = routes
                .filter(r => r.route.trim() && r.days.length > 0)
                .flatMap((r) => r.days.map((day) => ({ day, route: r.route })));

            const payload = {
                name: values.name,
                phone: values.phone,
                trader_id: finalTraderId,
                image: imageUrls[0] || '',
                routes: expandedRoutes
            };

            await dispatch(createDelegate(payload)).unwrap();
            resetForm();
            setRoutes([{ route: '', days: [] }]);
            setImages([]);
            setShow(false);
        } catch (err) {
            console.error('فشل في إضافة المندوب:', err.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            delegateImage: [],
            routes: [{ route: '', days: [] }]
        },
        validationSchema,
        onSubmit: handleAddDelegate
    });

    useEffect(() => {
        if (formik.values.phone) checkPhoneUnique(formik.values.phone);
    }, [formik.values.phone]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        formik.setFieldValue('delegateImage', files);
        setImages(files.map(f => URL.createObjectURL(f)));
    };

    const handleAddRoute = () => {
        const newRoutes = [...routes, { route: '', days: [] }];
        setRoutes(newRoutes);
        formik.setFieldValue('routes', newRoutes);
    };

    const handleRouteChange = (idx, val) => {
        const updated = [...routes];
        updated[idx].route = val;
        setRoutes(updated);
        formik.setFieldValue('routes', updated);
        formik.setFieldTouched(`routes[${idx}].route`, true, false);
    };

    const toggleDay = (idx, day) => {
        const updated = [...routes];
        const set = new Set(updated[idx].days);
        set.has(day) ? set.delete(day) : set.add(day);
        updated[idx].days = Array.from(set);
        setRoutes(updated);
        formik.setFieldValue('routes', updated);
    };

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
        setRoutes([{ route: '', days: [] }]);
        setImages([]);
    };

    return (
        <>
            <PrimaryButton label="إضافة مندوب" icon="fa-solid fa-user-plus" onClick={() => setShow(true)} />

            <Modal show={show} onHide={handleClose} centered dialogClassName="">
                <Modal.Header className="justify-content-between">
                    <Modal.Title>إضافة مندوب</Modal.Title>
                    <Button variant="" onClick={handleClose} style={{ fontSize: '1.5rem', border: 'none', background: 'none' }}>&times;</Button>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* صورة */}
                            <Col md={12} className="mb-3 text-center">
                                <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('delegateImg').click()}>
                                    <img src={images[0] || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="delegate" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                                <input id="delegateImg" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
                            </Col>

                            {/* اسم / هاتف */}
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

                            {/* تاجر */}
                            {isAdmin && (
                                <Col md={12} className="mb-3">
                                    <Form.Label>اختر التاجر</Form.Label>
                                    <Form.Select value={selectedTraderId} onChange={(e) => setSelectedTraderId(e.target.value)} required>
                                        <option value="">اختر تاجر</option>
                                        {users.filter(u => (u.role || '').toLowerCase() === 'trader').map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
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
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newRoutes = routes.filter((_, i) => i !== idx);
                                                    setRoutes(newRoutes);
                                                    formik.setFieldValue('routes', newRoutes);
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    left: 10,
                                                    width: '30px',
                                                    height: '30px',
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    lineHeight: '1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                                title="حذف هذا المسار"
                                            >
                                                ×
                                            </button>
                                          
                                        )}
                                        <Form.Control
                                            className="mb-2"
                                            placeholder="ادخل خط السير"
                                            value={r.route}
                                            onChange={(e) => handleRouteChange(idx, e.target.value)}
                                        />
                                        {formik.touched.routes?.[idx]?.days && formik.errors.routes?.[idx]?.days && (
                                            <div className="text-danger mb-1">{formik.errors.routes[idx].days}</div>
                                        )}
                                        <div className="d-flex flex-wrap gap-2">
                                            {daysOfWeek.map((day) => {
                                                const sel = r.days.includes(day);
                                                const disabled = !r.route.trim(); 
                                                return (
                                                    <div
                                                        key={day}
                                                        onClick={() => !disabled && toggleDay(idx, day)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            borderRadius: '20px',
                                                            backgroundColor: disabled ? '#e9ecef' : sel ? '#0d6efd' : '#f1f1f1',
                                                            color: disabled ? '#777' : sel ? '#fff' : '#333',
                                                            cursor: disabled ? 'not-allowed' : 'pointer',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>

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
