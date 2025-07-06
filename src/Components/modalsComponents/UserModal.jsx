import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../../css/Modal.module.css';
import '../../css/global.css';

const AddUserModal = ({ show, handleClose }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.customModal} className='customModal'>
      <div className="d-flex justify-content-between align-items-center px-3 pt-3">
        <Modal.Title>إضافة مستخدم</Modal.Title>
        <Modal.Header closeButton className="border-0 pb-0" />
      </div>

      <Modal.Body className="p-4">
        <Form>
          <Row>
            <Col md={12} className="mb-4 d-flex flex-column align-items-center">
              <div className="position-relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                  id="user-image-input"
                />
                <label htmlFor="user-image-input" className={styles.imagePicker}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="User" />
                  ) : (
                    <i className="fas fa-camera fs-4 text-muted"></i>
                  )}
                </label>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="username">
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control type="text" placeholder="ادخل اسم المستخدم" />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="email">
                <Form.Label>البريد الالكتروني</Form.Label>
                <Form.Control type="email" placeholder="ادخل البريد الالكتروني" />
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group controlId="password">
                <Form.Label>كلمة المرور</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="password"
                    placeholder="ادخل كلمة المرور"
                    dir="rtl"
                  />
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="governorate">
                <Form.Label>المحافظة</Form.Label>
                <Form.Select>
                  <option>اختر المحافظة</option>
                  <option>القاهرة</option>
                  <option>الجيزة</option>
                  <option>الإسكندرية</option>
                  <option>المنصورة</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group controlId="city">
                <Form.Label>المدينة</Form.Label>
                <Form.Select>
                  <option>اختر المدينة</option>
                  <option>مدينة نصر</option>
                  <option>6 أكتوبر</option>
                  <option>المعادي</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group controlId="role">
                <Form.Label>إضافة صلاحيات</Form.Label>
                <Form.Select>
                  <option>ادمن</option>
                  <option>تاجر</option>
                  <option>مستخدم</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12} className="mb-3">
              <Form.Group controlId="address">
                <Form.Label>العنوان</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="ادخل العنوان بالتفاصيل"
                    dir="rtl"
                  />
                  <i className="fas fa-map-marker-alt input-icon"></i>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <Button className="btn-primary w-100" onClick={handleClose}>
          تأكيد
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
