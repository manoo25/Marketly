import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createUser } from "../../redux/slices/Users";
import styles from "../../css/AuthLayout.module.css";
import Logo from "../../assets/Images/Logo.png";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
    password: Yup.string().min(6, "كلمة المرور قصيرة").required("كلمة المرور مطلوبة"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    location: Yup.string().required("العنوان مطلوب"),
    governorate: Yup.string().required("المحافظة مطلوبة"),
    city: Yup.string().required("المدينة مطلوبة"),
    role: Yup.string().required("نوع المستخدم مطلوب"),
    image: Yup.mixed().nullable(),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    governorate: "",
    city: "",
    role: "",
    image: null,
  };

const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const payload = {
      ...values,
      isBlocked: false,
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // صورة افتراضية
    };

    console.log("🚀 Payload to Supabase:", payload);

    const res = await dispatch(createUser(payload)).unwrap();

    if (res.role === "buyer") {
      navigate("/landing");
    } else if (res.role === "seller") {
      navigate("/dashboard");
    }
  } catch (err) {
    alert("❌ حصل خطأ في التسجيل: " + err);
  } finally {
    setSubmitting(false);
  }
};


  // لتحويل الصورة إلى base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className={styles.signupPage}>
      <Row className="g-0 justify-content-center align-items-center min-vh-100">
        <Col md={4} className={`d-none d-md-flex align-items-center justify-content-center ${styles.signupImageSection}`}>
          <img src={Logo} alt="شعار" className={styles.signupSideImg} />
        </Col>

        <Col md={7}>
          <div className={styles.signupFormWrapper}>
            <h4 className="mb-3">إنشاء حساب</h4>
            <p className="text-muted mb-4">يرجى ملء البيانات التالية لتسجيل حساب جديد.</p>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <Form dir="rtl" onSubmit={handleSubmit}>
                  <Row className="gy-3">
                    {/* الاسم */}
                    <Col md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>الاسم</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && !!errors.name}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* البريد */}
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* كلمة المرور */}
                    <Col md={6}>
                      <Form.Group controlId="password">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && !!errors.password}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* الهاتف */}
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>رقم الهاتف</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.phone && !!errors.phone}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* العنوان */}
                    <Col md={12}>
                      <Form.Group controlId="location">
                        <Form.Label>العنوان بالتفصيل</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.location && !!errors.location}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* المحافظة */}
                    <Col md={6}>
                      <Form.Group controlId="governorate">
                        <Form.Label>المحافظة</Form.Label>
                        <Form.Select
                          name="governorate"
                          value={values.governorate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.governorate && !!errors.governorate}
                          className="py-2"
                        >
                          <option value="">اختر المحافظة</option>
                          <option>القاهرة</option>
                          <option>الجيزة</option>
                          <option>الإسكندرية</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.governorate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* المدينة */}
                    <Col md={6}>
                      <Form.Group controlId="city">
                        <Form.Label>المدينة</Form.Label>
                        <Form.Select
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.city && !!errors.city}
                          className="py-2"
                        >
                          <option value="">اختر المدينة</option>
                          <option>مدينة نصر</option>
                          <option>المعادي</option>
                          <option>6 أكتوبر</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* نوع المستخدم */}
                    <Col md={12}>
                      <Form.Group controlId="role">
                        <Form.Label>نوع المستخدم</Form.Label>
                        <div className="d-flex gap-4">
                          <Form.Check
                            type="radio"
                            id="role_buyer"
                            label="مشتري"
                            value="buyer"
                            name="role"
                            onChange={handleChange}
                            checked={values.role === "buyer"}
                          />
                          <Form.Check
                            type="radio"
                            id="role_seller"
                            label="تاجر"
                            value="seller"
                            name="role"
                            onChange={handleChange}
                            checked={values.role === "seller"}
                          />
                        </div>
                        {touched.role && errors.role && <div className="text-danger mt-1">{errors.role}</div>}
                      </Form.Group>
                    </Col>

                    {/* صورة المستخدم */}
                    {/* <Col md={12}>
                      <Form.Group controlId="image">
                        <Form.Label>صورة الملف الشخصي (اختياري)</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setFieldValue("image", file);
                            setPreview(URL.createObjectURL(file));
                          }}
                        />
                        {preview && (
                          <img src={preview} alt="preview" className="mt-3 rounded" width={100} />
                        )}
                      </Form.Group>
                    </Col> */}

                    <Col md={12}>
  <Form.Group controlId="image">
    <Form.Label>صورة الملف الشخصي (اختياري)</Form.Label>
    <Form.Control
      type="file"
      disabled
      placeholder="غير مفعلة حاليًا"
    />
  </Form.Group>
</Col>


                    {/* الزرار */}
                    <Col md={12} className="text-end">
                      <Button type="submit" className="btn btn-primary px-4 mt-3">
                        تسجيل →
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
