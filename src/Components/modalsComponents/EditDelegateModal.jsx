
// ✅ نسخة موحّدة – EditDelegateModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { updateDelegate } from '../../Redux/Slices/DelegatesSlice';
import { UserRole } from '../../Redux/Slices/token';

/* 🗺️ المحافظات الثابتة */
const governorates = [
  { value: 'gharbia', label: 'الغربية' },
  { value: 'cairo', label: 'القاهرة' },
  { value: 'giza', label: 'الجيزة' },
  { value: 'dakahlia', label: 'الدقهلية' }
];

const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

const EditDelegateModal = ({ show, onClose, delegate, users, onUpdateSuccess, onUpdateFail }) => {
  const dispatch = useDispatch();
  const { delegates } = useSelector(s => s.Delegates);

  const [images, setImages] = useState([]);
  const [routes, setRoutes] = useState([{ governorate: '', route: '', days: [] }]);
  const [selectedTraderId, setTid] = useState(delegate.trader_id || '');
  const [phoneExists, setPhoneExists] = useState(false);

  useEffect(() => {
    const grouped = delegate.routes?.reduce((acc, cur) => {
      const ex = acc.find(r => r.route === cur.route && r.governorate === cur.governorate);
      ex ? ex.days.push(cur.day) : acc.push({ governorate: cur.governorate || '', route: cur.route, days: [cur.day] });
      return acc;
    }, []) || [{ governorate: '', route: '', days: [] }];

    setRoutes(grouped);
    setImages(delegate.image ? [delegate.image] : []);
  }, [delegate]);

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

  const checkUnique = debounce(val => {
    setPhoneExists(delegates.some(d => d.phone === val && d.id !== delegate.id));
  }, 500);

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
  useEffect(() => {
     if (UserRole!='admin') {
     setTid(sessionStorage.getItem("userID"))
     }
    }, [UserRole]);

  async function handleSave(values) {
    try {
      const imgUrls = values.delegateImage.length
        ? await uploadImagesToSupabase(values.delegateImage, 'delegates')
        : images;

      const validRoutes = routes
        .filter(r => r.governorate && r.route.trim() && r.days.length)
        .flatMap(r => r.days.map(day => ({ governorate: r.governorate, route: r.route, day })));

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

  const handleImg = e => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('delegateImage', files);
    setImages(files.map(f => URL.createObjectURL(f)));
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

  const addRoute = () => {
    const newR = [...routes, { governorate: '', route: '', days: [] }];
    setRoutes(newR); formik.setFieldValue('routes', newR);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className="justify-content-between">
        <Modal.Title>تعديل بيانات المندوب</Modal.Title>
        <Button variant="" onClick={onClose} style={{ fontSize: '1.5rem', border: 'none', background: 'none' }}>&times;</Button>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={12} className="mb-3 text-center">
              <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById('editImg').click()}>
                <img src={images[0] || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="delegate" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <input id="editImg" type="file" accept="image/*" className="d-none" onChange={handleImg} />
            </Col>

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

            {UserRole=='admin'&&
            <Col md={12} className="mb-3">
              <Form.Label>اختر التاجر</Form.Label>
              <Form.Select value={selectedTraderId} onChange={e => setTid(e.target.value)} required>
                <option value="">اختر تاجر</option>
                {users.filter(u => (u.role || '').toLowerCase() === 'trader').map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </Form.Select>
            </Col>
            }

            <Col md={12}>
              <Form.Label>خط السير</Form.Label>

              {routes.map((r, idx) => (
                <div key={idx} className="mb-3 border p-3 rounded position-relative">
                  {idx > 0 && (
                    <button type="button" onClick={() => removeRoute(idx)}
                      style={{ position: 'absolute', top: 10, left: 10, background: '#dc3545', color: '#fff', border: 'none', borderRadius: 5, fontWeight: 'bold', width: 30, height: 30 }}>×</button>
                  )}

                  <Row className="g-2">
                    <Col md={4}>
                      <Form.Select value={r.governorate} onChange={e => changeGov(idx, e.target.value)}>
                        <option value="">المحافظة</option>
                        {governorates.map(g => (
                          <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={8}>
                      <Form.Control placeholder="أدخل خط السير" value={r.route} onChange={e => changeRoute(idx, e.target.value)} />
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {daysOfWeek.map(day => {
                      const sel = r.days.includes(day);
                      const disable = !(r.governorate && r.route.trim());
                      return (
                        <div key={day} onClick={() => !disable && toggleDay(idx, day)}
                          style={{ padding: '6px 12px', borderRadius: 20, backgroundColor: disable ? '#e9ecef' : sel ? '#0d6efd' : '#f1f1f1', color: disable ? '#777' : sel ? '#fff' : '#333', cursor: disable ? 'not-allowed' : 'pointer', fontSize: '0.9rem' }}>
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
