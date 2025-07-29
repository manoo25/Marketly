import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { supabase } from "../../Supabase/SupabaseClient";
import { GetToken } from "../../Redux/Slices/token";
import styles from "../../css/AuthLayout.module.css";
import "../../css/global.css";
import Logo from "../../assets/Images/Logo.png";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ تفعيل dispatch

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
          .eq("password", values.password);

        if (error) throw error;

        if (!users || users.length === 0) {
          formik.setErrors({
            email: "البريد أو كلمة المرور غير صحيحة",
            password: "البريد أو كلمة المرور غير صحيحة",
          });
          return;
        }

        const user = users[0];
        sessionStorage.setItem("userID", user.id);
const result = await dispatch(GetToken());
console.log(result);
        if (user.isBlocked) {
          alert("أنت محظور، يرجى التواصل معنا!");
          navigate("/");
          return;
        }

        sessionStorage.removeItem("sb-auxwhdusfpgyzbwgjize-auth-token");

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

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/google-setup`,
      },
    });

    if (error) {
      console.error("Login Error:", error.message);
      alert("فشل تسجيل الدخول بواسطة جوجل");
    }
  };

  return (
    <div className={styles.signupPage}>
      <Row className="g-0 justify-content-center align-items-center min-vh-100">
        {/* الجانب الأيسر */}
        <Col
          md={4}
          className="d-none d-md-flex align-items-center justify-content-center p-4"
          style={{
            background: "linear-gradient(135deg, #5f27cd, #74b9ff)",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            color: "#fff",
            flexDirection: "column",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.05)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.05)",
              zIndex: 0,
            }}
          />
          <img
            src={Logo}
            alt="Marketly Logo"
            style={{
              maxWidth: "120px",
              marginBottom: "1.2rem",
              zIndex: 2,
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.25))",
            }}
          />
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem", zIndex: 2 }}>
            أهلاً بك في <span style={{ color: "#00ffe0" }}>Marketly</span>
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.7",
              maxWidth: "260px",
              zIndex: 2,
              opacity: 0.95,
            }}
          >
            تحكّم في متجرك الذكي بسهولة، وسرعة، واحترافية. كل شيء في مكان واحد —
            لأننا نعرف قيمة وقتك.
          </p>
          <p className="mt-3 text-white-50" style={{ fontSize: "0.85rem" }}>
            جرب Marketly وغيّر طريقة إدارتك لمتجرك.
          </p>
        </Col>

        {/* نموذج تسجيل الدخول */}
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
                      <div className="text-danger small">
                        {formik.errors.email}
                      </div>
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
                        className="py-2"
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
                      <div className="text-danger small">
                        {formik.errors.password}
                      </div>
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
                    style={{
                      backgroundColor: "#28a745",
                      borderColor: "#28a745",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}
                  </Button>
                </Col>

                <Col md={12}>
                  <Button
                    onClick={loginWithGoogle}
                    variant="light"
                    className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2 border mt-1"
                    style={{
                      borderColor: "#ddd",
                      color: "#555",
                      fontSize: "1rem",
                      padding: "0.4rem 1rem",
                      backgroundColor: "#fff",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.borderColor = "#ccc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.borderColor = "#ddd";
                    }}
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#fff",
                        padding: "2px",
                        borderRadius: "50%",
                      }}
                    />
                    الدخول بواسطة جوجل
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
              <Link
                to="/SignUp"
                className="text-decoration-none text-warning fw-bold"
              >
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
