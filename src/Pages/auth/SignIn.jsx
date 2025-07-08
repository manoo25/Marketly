import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../../css/AuthLayout.module.css";
import "../../css/global.css";
import Logo from "../../assets/Images/Logo.png"

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={styles.signupPage}>
      <Row className="g-0 justify-content-center align-items-center min-vh-100">
        <Col
          md={4}
          className={`d-none d-md-flex align-items-center justify-content-center rounded-3 ${styles.signupImageSection}`}>
          <img
            src={Logo}
            alt="تسجيل دخول"
            className={styles.signupSideImg}/>
        </Col>

        <Col md={7}>
          <div className={styles.signupFormWrapper}>
            <h2 className="fw-bold mb-2">مرحباً بعودتك!</h2>
            <p className="text-muted mb-4">
              من فضلك أدخل بياناتك لتسجيل الدخول إلى حسابك.
            </p>

            <Form dir="rtl">
              <Row className="gy-3">
                 <Col md={12}>
                  <Form.Group controlId="email">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        placeholder="ادخل بريدك الإلكتروني.."
                        className="py-2 ps-4"
                      />
                      <i
                        className="fas fa-envelope position-absolute"
                        style={{
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#888",
                        }}
                      ></i>
                    </div>
                  </Form.Group>
                </Col>
                 <Col md={12}>
                  <Form.Group controlId="password">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="ادخل كلمة المرور.."
                        className="py-2 ps-4"
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
                  </Form.Group>
                </Col>

                 <Col md={12} className="d-flex justify-content-end ">
                   <a href="#" className="text-decoration-none text-success">
                    نسيت كلمة المرور؟
                  </a>
                </Col>
                 <Col md={12}>
                  <Button
                    type="submit"
                    className="w-100 mt-2"
                    style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                  >
                    تسجيل الدخول
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
              <a href="#" className="text-decoration-none text-warning fw-bold">
                إنشاء حساب
              </a>
            </div>
           </div>
        </Col>
      </Row>
    </div>
  );
};

export default SigninPage;
