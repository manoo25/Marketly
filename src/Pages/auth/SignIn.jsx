import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../../css/AuthLayout.module.css";
import "../../css/global.css";
import Logo from "../../assets/Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("صيغة البريد غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور قصيرة جداً")
      .required("كلمة المرور مطلوبة"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
         const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", values.email)
          .eq("password", values.password)  

        if (error) throw error;

        if (!users || users.length === 0) {
          formik.setErrors({
            email: "البريد أو كلمة المرور غير صحيحة",
            password: "البريد أو كلمة المرور غير صحيحة",
          });
          return;
        }

        const user = users[0];

         if (user.role === "admin" || user.role === "trader") {
          navigate("/Dashboard/Charts");
        } else {
          navigate("/Landing");
        }

      } catch (err) {
        console.error("❌ خطأ أثناء تسجيل الدخول:", err.message);
        alert("حدث خطأ أثناء تسجيل الدخول");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.signupPage}>
      <Row className="g-0 justify-content-center align-items-center min-vh-100">
        <Col
          md={4}
          className={`d-none d-md-flex align-items-center justify-content-center rounded-3 ${styles.signupImageSection}`}>
          <img src={Logo} alt="تسجيل دخول" className={styles.signupSideImg} />
        </Col>

        <Col md={7}>
          <div className={styles.signupFormWrapper}>
            <h2 className="fw-bold mb-2 text-end">مرحباً بعودتك!</h2>
            <p className="text-muted mb-4 text-end">
              من فضلك أدخل بياناتك لتسجيل الدخول إلى حسابك.
            </p>

            <Form onSubmit={formik.handleSubmit} dir="rtl">
              <Row className="gy-3">
                <Col md={12}>
                  <Form.Group controlId="email">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="ادخل بريدك الإلكتروني"
                      className="py-2"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger small">{formik.errors.email}</div>
                    )}
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group controlId="password">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ادخل كلمة المرور"
                        className="py-2 "
                      />
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } position-absolute`}
                        onClick={togglePasswordVisibility}
                        style={{
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#888",
                          cursor: "pointer",
                        }}
                      ></i>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger small">{formik.errors.password}</div>
                    )}
                  </Form.Group>
                </Col>

                <Col md={12} className="d-flex justify-content-end">
                  <Link to="#" className="text-decoration-none text-success">
                    نسيت كلمة المرور؟
                  </Link>
                </Col>

                <Col md={12}>
                  <Button
                    type="submit"
                    className="w-100 mt-2 fw-bold"
                    style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
                  </Button>
                </Col>
              </Row>
            </Form>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">أو</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="text-center">
              <span>ليس لديك حساب؟ </span>
              <Link to="/SignUp" className="text-decoration-none text-warning fw-bold">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SigninPage;
