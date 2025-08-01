import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../../css/Modal.module.css';
import '../../css/global.css';

const EditProfileModal = ({ show, handleClose }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.customModal}>     
              <Modal.Header>
                <div className="border-0 pb-0 d-flex align-items-center justify-content-between w-100">
                  <Modal.Title>تعديل الملف الشخصي</Modal.Title>
                  <button className='fa-solid fa-close border-0 bg-transparent CloseModalBtn' onClick={handleClose} />
                </div>
              </Modal.Header>

      <Modal.Body className="p-4">
        <Form>
          <Row>
            {/* صورة البروفايل */}
            <Col md={12} className="mb-4 d-flex flex-column align-items-center">
              <div className="position-relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                  id="profile-image-input"
                />
                <label htmlFor="profile-image-input" className={styles.imagePicker}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" />
                  ) : (
                    <i className="fas fa-user-circle fs-4 text-muted"></i>
                  )}
                </label>
              </div>
            </Col>

            {/* الاسم */}
            <Col md={6} className="mb-3">
              <Form.Group controlId="username">
                <Form.Label>الاسم</Form.Label>
                <Form.Control type="text" placeholder="ادخل الاسم" />
              </Form.Group>
            </Col>

            {/* البريد */}
            <Col md={6} className="mb-3">
              <Form.Group controlId="email">
                <Form.Label>البريد الالكتروني</Form.Label>
                <Form.Control type="email" placeholder="example@mail.com" />
              </Form.Group>
            </Col>

            {/* كلمة المرور الجديدة */}
            <Col md={12} className="mb-3">
              <Form.Group controlId="newPassword">
                <Form.Label>كلمة المرور الجديدة</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="password"
                    placeholder="ادخل كلمة المرور الجديدة"
                    dir="rtl"
                  />
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </Form.Group>
            </Col>

            {/* العنوان */}
            <Col md={12} className="mb-3">
              <Form.Group controlId="address">
                <Form.Label>العنوان</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="ادخل عنوانك"
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
          حفظ التعديلات
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
