// ✅ نسخة مُحدَّثة – EditDelegateModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { updateDelegate } from '../../Redux/Slices/DelegatesSlice';

const daysOfWeek = [
    'السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'
];

const EditDelegateModal = ({ show, onClose, delegate, users, onUpdateSuccess, onUpdateFail }) => {
    const dispatch = useDispatch();
    const { delegates } = useSelector(s => s.Delegates);

    /* ───────── state ───────── */
    const [images, setImages] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedTraderId, setTid] = useState(delegate.trader_id || '');
    const [phoneExists, setPhoneExists] = useState(false);

    /* ─── prepare initial routes/image ─── */
    useEffect(() => {
        // دمج الأيام المتكرّرة لنفس المسار
        const grouped = delegate.routes?.reduce((acc, cur) => {
            const ex = acc.find(r => r.route === cur.route);
            ex ? ex.days.push(cur.day) : acc.push({ route: cur.route, days: [cur.day] });
            return acc;
        }, []) || [{ route: '', days: [] }];
        setRoutes(grouped);
        setImages(delegate.image ? [delegate.image] : []);
    }, [delegate]);

    /* ─── Yup schema ─── */
    const validationSchema = Yup.object({
        name: Yup.string().required('الاسم مطلوب'),
        phone: Yup.string().matches(/^[0-9]{10,15}$/, 'رقم غير صالح').required('رقم الهاتف مطلوب'),
        routes: Yup.array()
            .of(
                Yup.object().shape({
                    route: Yup.string(),
                    days: Yup.array().of(Yup.string())
                })
                    .test(
                        'complete-or-empty',
                        'يجب إدخال خط السير واختيار أيام أو تركهما فارغين',
                        v => {
                            const hasRoute = v.route?.trim() !== '';
                            const hasDays = (v.days || []).length > 0;
                            return (!hasRoute && !hasDays) || (hasRoute && hasDays);
                        }
                    )
            )
            .test(
                'at-least-one-filled',
                'يجب إدخال خط سير واحد على الأقل مع الأيام',
                arr => arr?.some(r => r.route?.trim() !== '' && r.days?.length > 0)
            )
    });

    /* ─── phone uniqueness ─── */
    const checkUnique = debounce(val => {
        setPhoneExists(delegates.some(d => d.phone === val && d.id !== delegate.id));
    }, 500);

    /* ─── Formik ─── */
    const formik = useFormik({
        initialValues: {
            name: delegate.name || '',
            phone: delegate.phone || '',
            delegateImage: [],
            routes
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleSave
    });

    useEffect(() => { if (formik.values.phone) checkUnique(formik.values.phone); }, [formik.values.phone]);

    /* ─── handlers ─── */
    function handleImg(e) {
        const files = Array.from(e.target.files);
        formik.setFieldValue('delegateImage', files);
        setImages(files.map(f => URL.createObjectURL(f)));
    }

    function handleRouteChange(idx, val) {
        const upd = [...routes];
        upd[idx].route = val;
        setRoutes(upd);
        formik.setFieldValue('routes', upd);
        formik.setFieldTouched(`routes[${idx}].route`, true, false);
    }

    function toggleDay(idx, day) {
        if (!routes[idx].route.trim()) return;
        const upd = [...routes];
        const set = new Set(upd[idx].days);
        set.has(day) ? set.delete(day) : set.add(day);
        upd[idx].days = [...set];
        setRoutes(upd);
        formik.setFieldValue('routes', upd);
    }

    function addRoute() {
        const upd = [...routes, { route: '', days: [] }];
        setRoutes(upd);
        formik.setFieldValue('routes', upd);
    }

    function removeRoute(idx) {
        const upd = routes.filter((_, i) => i !== idx);
        setRoutes(upd);
        formik.setFieldValue('routes', upd);
    }

    /* ─── save ─── */
    async function handleSave(values) {
        try {
            const imgUrls = values.delegateImage.length
                ? await uploadImagesToSupabase(values.delegateImage, 'delegates')
                : images;

            const validRoutes = routes
                .filter(r => r.route.trim() && r.days.length > 0)
                .flatMap(r => r.days.map(day => ({ day, route: r.route })));

            await dispatch(updateDelegate({
                id: delegate.id,
                updatedData: {
                    name: values.name,
                    phone: values.phone,
                    trader_id: selectedTraderId,
                    image: imgUrls[0] || '',
                    routes: validRoutes
                }
            })).unwrap();

            onUpdateSuccess?.();
            onClose();
        } catch (err) {
            console.error('فشل التعديل:', err);
            onUpdateFail?.();
        }
    }

    /* ─── UI ─── */
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header className="justify-content-between">
                <Modal.Title>تعديل بيانات المندوب</Modal.Title>
                <Button variant="" onClick={onClose} style={{ fontSize: '1.5rem', border: 'none', background: 'none' }}>&times;</Button>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row>
                        {/* صورة */}
                        <Col md={12} className="mb-3 text-center">
                            <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('editImg').click()}>
                                <img src={images[0] || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="delegate" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
                            </div>
                            <input id="editImg" type="file" accept="image/*" className="d-none" onChange={handleImg} />
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

                        {/* التاجر */}
                        <Col md={12} className="mb-3">
                            <Form.Label>اختر التاجر</Form.Label>
                            <Form.Select value={selectedTraderId} onChange={e => setTid(e.target.value)} required>
                                <option value="">اختر تاجر</option>
                                {users.filter(u => (u.role || '').toLowerCase() === 'trader').map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* خطوط السير */}
                        <Col md={12}>
                            <Form.Label>خط السير</Form.Label>

                            {routes.map((r, idx) => (
                                <div key={idx} className="mb-3 border p-3 rounded position-relative">
                                    {/* زر حذف للمسارات بعد الأول */}
                                    {idx > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRoute(idx)}
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
                                        >
                                            ×
                                        </button>
                                      
                                    )}

                                    <Form.Control
                                        className="mb-2"
                                        placeholder="ادخل خط السير"
                                        value={r.route}
                                        onChange={e => handleRouteChange(idx, e.target.value)}
                                    />

                                    {/* رسائل الخطأ للمسار الحالي */}
                                    {formik.touched.routes?.[idx]?.days && formik.errors.routes?.[idx]?.days && (
                                        <div className="text-danger mb-1">{formik.errors.routes[idx].days}</div>
                                    )}

                                    <div className="d-flex flex-wrap gap-2">
                                        {daysOfWeek.map(day => {
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
                                                >{day}</div>
                                            );
                                        })}
                                    </div>

                                    {/* رسالة التحقق العامة (تظهر مرة واحدة تحت أول مسار) */}
                                    {idx === 0 && typeof formik.errors.routes === 'string' && (
                                        <div className="text-danger mt-2">{formik.errors.routes}</div>
                                    )}
                                </div>
                            ))}

                            <Button variant="secondary" onClick={addRoute}>إضافة خط سير</Button>
                        </Col>

                        <Col md={12} className="mt-3">
                            <Button type="submit" className="w-100 btn-primary">حفظ التعديلات</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditDelegateModal;
