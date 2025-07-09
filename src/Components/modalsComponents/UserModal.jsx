import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../../css/Modal.module.css';
import '../../css/global.css';
import PrimaryButton from '../globalComonents/PrimaryButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../Redux/Slices/Users';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage'; // نفس الدالة


const AddUserModal = () => {
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.Users);

  // const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('userImage', files); // نحفظها كمصفوفة زي المنتجات
    const previews = files.map(file => URL.createObjectURL(file));
    setImages(previews);
  };
  
  const handleAddUser = async () => {

    // Check email and phone if they are already signed up
    const emailExists = users.some(user => user.email === formik.values.email);
    const phoneExists = users.some(user => user.phone === formik.values.phone);
    if (emailExists) {
      formik.setFieldError('email', 'البريد مسجل مسبقًا');
    }
    if (phoneExists) {
      formik.setFieldError('phone', 'رقم الهاتف مستخدم من قبل');
    }
    if (emailExists || phoneExists) return; 
    // Check email and phone if they are already signed up


    try {
      console.log(formik.values.userImage); 

      const imageUrls = await uploadImagesToSupabase(formik.values.userImage, 'users');
      const { userImage, ...cleanValues } = formik.values;
      console.log(userImage);
      
      const values = {
        ...cleanValues,
        isBlocked: false, 
        image: imageUrls[0],
        phone: formik.values.phone,
        password: formik.values.password,
      };
      console.log("🔍 Payload to be sent:", values);
      await dispatch(createUser(values)).unwrap();

      formik.resetForm();
      setImages([]);
      setShow(false);
    } catch (error) {
      console.error("❌ Failed to add user:", error.message);
    }
  };
  

  const validationSchema = Yup.object({
    name: Yup.string().required('الاسم مطلوب'),
    email: Yup.string().email('صيغة البريد غير صحيحة').required('البريد مطلوب'),
    phone: Yup.string().matches(/^\d{10,15}$/, 'رقم غير صالح').required('رقم الهاتف مطلوب'),
    password: Yup.string().min(6, 'كلمة المرور قصيرة').required('كلمة المرور مطلوبة'),
    governorate: Yup.string().required('المحافظة مطلوبة'),
    city: Yup.string().required('المدينة مطلوبة'),
    role: Yup.string().required('الصلاحية مطلوبة'),
    location: Yup.string().required('العنوان مطلوب'),
    userImage: Yup.mixed().test('required', 'الصورة مطلوبة', value => value && value.length > 0)

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      governorate: '',
      city: '',
      role: 'user',
      location: '',
      userImage: []
    },
    validationSchema,
    onSubmit: handleAddUser
  });

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setImages([]);
  };
  

  return (
    <>
      <PrimaryButton
        label="إضافة مستخدم"
        icon='fa-solid fa-user-plus'
        onClick={() => setShow(true)}
      />
      <Modal show={show} onHide={handleClose} centered dialogClassName={styles.customModal} className='customModal'>
        <Modal.Header>
          <div className="border-0 pb-0 d-flex align-items-center justify-content-between w-100">
            <Modal.Title>إضافة مستخدم</Modal.Title>
            <button className='fa-solid fa-close border-0 bg-transparent CloseModalBtn' onClick={handleClose} />
          </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={12} className="mb-5 d-flex flex-column align-items-center">
                <div className="position-relative" style={{ width: '100px', height: '100px' }}>
                  <div
                    onClick={() => document.getElementById('userImageInput').click()}
                    className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border border-2"
                    style={{ width: '100px', height: '100px', cursor: 'pointer', position: 'relative' }}
                  >
                    <img
                      src={images[0] || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                      alt="User"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        fontSize: '20px',
                        opacity: 0,
                        transition: '0.3s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      <i className="fas fa-camera"></i>
                    </div>
                  </div>
                  <input
                    id="userImageInput"
                    name="userImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                    className="d-none"
                  />
                  {formik.touched.userImage && formik.errors.userImage && (
                    <div className="text-danger mt-2">{formik.errors.userImage}</div>
                  )}
                </div>
              </Col>



              <Col md={6} className="mb-3">
                <Form.Group controlId="username">
                  <Form.Label>اسم المستخدم</Form.Label>
                  <Form.Control
                    name='name'
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="ادخل اسم المستخدم"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="email">
                  <Form.Label>البريد الالكتروني</Form.Label>
                  <Form.Control
                    name='email'
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="ادخل البريد الالكتروني"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="phone">
                  <Form.Label>رقم الهاتف</Form.Label>
                  <Form.Control
                    name='phone'
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="ادخل رقم الهاتف"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="password">
                  <Form.Label>كلمة المرور</Form.Label>
                  <Form.Control
                    name='password'
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="ادخل كلمة المرور"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="governorate">
                  <Form.Label>المحافظة</Form.Label>
                  <Form.Select
                    name='governorate'
                    value={formik.values.governorate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">اختر المحافظة</option>
                    <option value="cairo">القاهرة</option>
                    <option value="giza">الجيزة</option>
                    <option value="alex">الإسكندرية</option>
                    <option value="mansoura">المنصورة</option>
                  </Form.Select>
                  {formik.touched.governorate && formik.errors.governorate && (
                    <div className="text-danger">{formik.errors.governorate}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="city">
                  <Form.Label>المدينة</Form.Label>
                  <Form.Select
                    name='city'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">اختر المدينة</option>
                    <option value="nasr city">مدينة نصر</option>
                    <option value="6 oct">6 أكتوبر</option>
                    <option value="maady">المعادي</option>
                  </Form.Select>
                  {formik.touched.city && formik.errors.city && (
                    <div className="text-danger">{formik.errors.city}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="role">
                  <Form.Label>إضافة صلاحيات</Form.Label>
                  <Form.Select
                    name='role'
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="admin">ادمن</option>
                    <option value="trader">تاجر</option>
                    <option value="user">مستخدم</option>
                  </Form.Select>
                  {formik.touched.role && formik.errors.role && (
                    <div className="text-danger">{formik.errors.role}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="address">
                  <Form.Label>العنوان</Form.Label>
                  <Form.Control
                    name='location'
                    type="text"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="ادخل العنوان بالتفاصيل"
                    dir="rtl"
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="text-danger">{formik.errors.location}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Button className="btn-primary w-100 mt-3" type="submit">
              تأكيد
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserModal;
