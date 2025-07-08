import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../css/global.css';
import PrimaryButton from '../globalComonents/PrimaryButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/Slices/ProductSlice';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { GetCategories } from '../../Redux/Slices/Categories';
import { GetUnits } from '../../Redux/Slices/units';

const AddProductModal = () => {
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const [PiecePrice, SetPiecePrice] = useState('');
  const [EndPrice, SetEndPrice] = useState('');
  const {categories}=useSelector((state)=>state.Categories);
  const {Units}=useSelector((state)=>state.Units);

  
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GetCategories());
      dispatch(GetUnits());
    }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('image', files); // Store files for upload
    const previews = files.map(file => URL.createObjectURL(file));
    setImages(previews);
  };

  const getPriceOfPiece = (price) => {
    const taxes = price * 0.02;
    const total = Number(price) + Number(taxes);
    SetEndPrice(total);

    const quantity = Number(formik.values.quantity_per_unit);
    if (quantity > 0) {
      const pricePerPiece = total / quantity;
      SetPiecePrice(pricePerPiece);
    } else {
      SetPiecePrice(0);
    }
  };

  const handleAddPro = async () => {
    try {
      const imageUrls = await uploadImagesToSupabase(formik.values.image, 'products');
      const values = {
        ...formik.values,
        image: imageUrls[0],
        traderprice: Number(formik.values.traderprice),
        quantity: Number(formik.values.quantity),
        quantity_per_unit: Number(formik.values.quantity_per_unit),
        endprice: Number(EndPrice),
      };

      if (
        isNaN(values.traderprice) ||
        isNaN(values.quantity) ||
        isNaN(values.quantity_per_unit)
      ) {
        console.error("❌ تأكد من ملء جميع الحقول الرقمية");
        return;
      }

      await dispatch(createProduct(values)).unwrap();
      formik.resetForm();
      setImages([]);
      setShow(false);
    } catch (error) {
      console.error("❌ Failed to add product:", error.message);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('اسم المنتج مطلوب'),
    description: Yup.string().required('الوصف مطلوب'),
    traderprice: Yup.number().required('السعر مطلوب').min(1),
    quantity: Yup.number().required('الكمية مطلوبة').min(1),
    quantity_per_unit: Yup.number().required('الكمية لكل وحدة مطلوبة').min(1),
    category_id: Yup.string().required('التصنيف مطلوب'),
    unit: Yup.string().required('الوحدة مطلوبة'),
    company_id: Yup.string().required('الشركة مطلوبة'),
    trader_id: Yup.string().required('التاجر مطلوب'),
    image: Yup.mixed().test('required', 'الصورة مطلوبة', value => value && value.length > 0),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: '',
      traderprice: 0,
      endprice: 0,
      quantity: 0,
      category_id: "4bbea67b-f092-4af4-8608-761a8c9294ec",
      trader_id: "52688acd-ffad-4f79-a904-b1af85f996f5",
      company_id: "c4dedf2e-1a44-44a9-8dcb-502917676bb1",
      unit: "",
      quantity_per_unit: 10,
      image: ''
    },
    validationSchema,
    onSubmit: handleAddPro
  });

  return (
    <>
      <PrimaryButton
        label="إضافة منتج"
        icon='fa-solid fa-square-plus'
        onClick={() => setShow(true)}
      />
      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName='AddProductModal'>
        <Modal.Header>
          <div className="border-0 pb-0 d-flex align-items-center justify-content-between w-100">
            <Modal.Title>إضافة منتج</Modal.Title>
            <button className='fa-solid fa-close border-0 bg-transparent CloseModalBtn' onClick={() => setShow(false)} />
          </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>اسم المنتج</Form.Label>
                  <Form.Control
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="ادخل اسم المنتج"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>التصنيف</Form.Label>
                  <Form.Select
                    name="category_id"
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" selected={true}>اختر التصنيف</option>
                    {categories.map((category)=>(
 <option value={category.id}>{category.name}</option>
                    ))};
                  </Form.Select>
                  {formik.touched.category_id && formik.errors.category_id && (
                    <div className="text-danger">{formik.errors.category_id}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>الوحدة</Form.Label>
                  <Form.Select
                    name="unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">اختر الوحدة</option>
                      {Units.map((unit)=>(
 <option value={unit.name}>{unit.name}</option>
                    ))};
                  </Form.Select>
                  {formik.touched.unit && formik.errors.unit && (
                    <div className="text-danger">{formik.errors.unit}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>الشركة المصنعة</Form.Label>
                  <Form.Select
                    name="company_id"
                    value={formik.values.company_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">اختر الشركة</option>
                    <option value="c4dedf2e-1a44-44a9-8dcb-502917676bb1">شركة 1</option>
                    <option value="2">شركة 2</option>
                  </Form.Select>
                  {formik.touched.company_id && formik.errors.company_id && (
                    <div className="text-danger">{formik.errors.company_id}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>الكمية المتاحة</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="أدخل الكمية"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.quantity && formik.errors.quantity && (
                    <div className="text-danger">{formik.errors.quantity}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>الكمية للوحدة</Form.Label>
                  <Form.Control
                    type="number"
                    name='quantity_per_unit'
                    placeholder="أدخل الكمية"
                    onChange={(e) => {
                      formik.handleChange(e);
                      getPriceOfPiece(formik.values.traderprice);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.quantity_per_unit}
                  />
                  {formik.touched.quantity_per_unit && formik.errors.quantity_per_unit && (
                    <div className="text-danger">{formik.errors.quantity_per_unit}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>السعر</Form.Label>
                  <Form.Control
                    type="number"
                    name='traderprice'
                    placeholder="جنيه مصري"
                    onChange={(e) => {
                      formik.handleChange(e);
                      getPriceOfPiece(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.traderprice}
                  />
                  {formik.touched.traderprice && formik.errors.traderprice && (
                    <div className="text-danger">{formik.errors.traderprice}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>السعر بعد الضريبة</Form.Label>
                  <Form.Control type="number" value={EndPrice} readOnly />
                </Form.Group>
              </Col>

              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>سعر القطعة</Form.Label>
                  <Form.Control type="number" value={PiecePrice} readOnly />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    placeholder="اكتب وصف المنتج"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-danger">{formik.errors.description}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>صور المنتج</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-danger">{formik.errors.image}</div>
                  )}
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
            <Button className="btn-primary w-100 mt-3" type="submit">
              تأكيد الإضافة
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
