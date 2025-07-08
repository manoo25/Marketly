import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../../css/AuthLayout.module.css";
import "../../css/global.css";
import Logo from "../../assets/Images/Logo.png"
const SignUpPage = () => {
  return (
    <div className={styles.signupPage}>
      <Row className="g-0 justify-content-center align-items-center min-vh-100">
        <Col
          md={4}
          className={`d-none d-md-flex align-items-center justify-content-center rounded-3  ${styles.signupImageSection}`}
        >
          <img
            src={Logo}
            alt="تسجيل مستخدم"
            className={styles.signupSideImg}
          />
        </Col>

        <Col md={7} >
          <div className={styles.signupFormWrapper}>
            <h4 className="mb-3">إنشاء حساب</h4>
            <p className="text-muted mb-4">
              هنساعدك تكمل البيانات علشان نقدر نتحقق من المعلومات الخاصة بيك ونخصص حسابك.
            </p>

            <Form dir="rtl">
              <Row className="gy-3">
                {/* اسم المؤسسة */}
                <Col md={6}>
                  <Form.Group controlId="institution">
                    <Form.Label>اسم المؤسسة</Form.Label>
                    <div className="position-relative">
                      <Form.Control type="text" placeholder="ادخل اسم المؤسسة" className="py-2" />
                      <i className="fas fa-building input-icon"></i>
                    </div>
                  </Form.Group>
                </Col>

                {/* نوع المنفذ */}
                <Col md={6}>
                  <Form.Group controlId="outletType">
                    <Form.Label>نوع المنفذ</Form.Label>
                    <div className="position-relative">
                      <Form.Select className="py-2 custom-select" dir="rtl">
                        <option>اختر النوع</option>
                        <option>صيدلية</option>
                        <option>معمل تحاليل</option>
                        <option>مستشفى</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                </Col>

                {/* رقم الهاتف */}
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>رقم الهاتف</Form.Label>
                    <div className="position-relative">
                      <Form.Control type="text" placeholder="ادخل رقم الهاتف" className="py-2" />
                      <i className="fas fa-phone input-icon"></i>
                    </div>
                  </Form.Group>
                </Col>

                {/* العنوان */}
                <Col md={6}>
                  <Form.Group controlId="address">
                    <Form.Label>العنوان</Form.Label>
                    <div className="position-relative">
                      <Form.Control type="text" placeholder="ادخل العنوان بالتفصيل" className="py-2" />
                      <i className="fas fa-map-marker-alt input-icon"></i>
                    </div>
                  </Form.Group>
                </Col>

                {/* المحافظة */}
                <Col md={6}>
                  <Form.Group controlId="governorate">
                    <Form.Label>المحافظة</Form.Label>
                    <Form.Select className="py-2 custom-select" dir="rtl">
                      <option>اختر المحافظة</option>
                      <option>القاهرة</option>
                      <option>الجيزة</option>
                      <option>الإسكندرية</option>
                      <option>المنصورة</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* المدينة */}
                <Col md={6}>
                  <Form.Group controlId="city">
                    <Form.Label>المدينة</Form.Label>
                    <Form.Select className="py-2 custom-select" dir="rtl">
                      <option>اختر المدينة</option>
                      <option>مدينة نصر</option>
                      <option>المعادي</option>
                      <option>6 أكتوبر</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* الإيميل */}
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <div className="position-relative">
                      <Form.Control type="email" placeholder="ادخل البريد الإلكتروني" className="py-2" />
                      <i className="fas fa-envelope input-icon"></i>
                    </div>
                  </Form.Group>
                </Col>

                {/* كلمة المرور */}
                <Col md={6}>
                  <Form.Group controlId="password">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="position-relative">
                      <Form.Control type="password" placeholder="ادخل كلمة المرور" className="py-2" />
                      <i className="fas fa-lock input-icon"></i>
                    </div>
                  </Form.Group>
                </Col>

                {/* الزرار */}
                <Col md={12} className="text-end">
                  <Button type="submit" className="btn btn-primary px-4 mt-3">
                    التالي →
                  </Button>
                </Col>
              </Row>
            </Form>
 
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
