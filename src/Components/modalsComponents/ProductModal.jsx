import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../../css/Modal.module.css';
import '../../css/global.css';
import PrimaryButton from '../globalComonents/PrimaryButton';
import DangerButton from '../globalComonents/DangerButton';

const AddProductModal = () => {
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImages(previews);
  };

  return (
    <>
    
<PrimaryButton
label="إضافة منتج"
icon='fa-solid fa-square-plus'
onClick={() => setShow(true)}
/>
      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName={styles.customModal}>
        <Modal.Header >
         <div className="border-0 pb-0 d-flex align-items-center justify-content-between  w-100">
           <Modal.Title>إضافة منتج</Modal.Title>
          <button className='fa-solid fa-close border-0 bg-transparent CloseModalBtn' onClick={() => setShow(false)}/>
         </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="productName">
                  <Form.Label className="fw-semibold">اسم المنتج</Form.Label>
                  <Form.Control type="text" placeholder="ادخل اسم المنتج" />
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group controlId="price">
                  <Form.Label className="fw-semibold">السعر</Form.Label>
                  <Form.Control type="number" placeholder="جنيه مصري" />
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group controlId="discountPrice">
                  <Form.Label className="fw-semibold">بعد الخصم</Form.Label>
                  <Form.Control type="number" placeholder="اختياري" />
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Group controlId="quantity">
                  <Form.Label className="fw-semibold">الكمية المتاحة</Form.Label>
                  <Form.Control type="number" placeholder="أدخل الكمية" />
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Group controlId="category">
                  <Form.Label className="fw-semibold">الفئة</Form.Label>
                  <Form.Select>
                    <option>اختر الفئة</option>
                    <option>ملابس</option>
                    <option>أجهزة</option>
                    <option>إكسسوارات</option>
                    <option>مستلزمات منزلية</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Group controlId="status">
                  <Form.Label className="fw-semibold">الحالة</Form.Label>
                  <Form.Select>
                    <option>متاح</option>
                    <option>غير متاح</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="description">
                  <Form.Label className="fw-semibold">الوصف</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="اكتب وصف المنتج بشكل مختصر" />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="productImages">
                  <Form.Label className="fw-semibold">صور المنتج</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <div className="d-flex flex-wrap gap-2 mt-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`preview-${index}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                      }}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-top-0">
          <Button className="btn-primary w-100" onClick={() => setShow(false)}>
            تأكيد الإضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;
