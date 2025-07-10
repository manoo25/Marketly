import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { GetCategories } from '../../Redux/Slices/Categories';
import { GetUnits } from '../../Redux/Slices/units';
import { fetchCompanies } from '../../Redux/Slices/CompaniesSlice';
import { deleteImageFromStore, updateProduct } from '../../Redux/Slices/ProductSlice';

const EditProductModal = ({ product, show, setShow }) => {
  const [images, setImages] = useState(product?.image ? [product.image] : []);
  const [PiecePrice, SetPiecePrice] = useState('');
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.Categories);
  const { Units } = useSelector((state) => state.Units);
  const { companies } = useSelector((state) => state.Companies);

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetUnits());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const getPriceOfPiece = (price) => {
    const total = Number(price);
    const quantity = Number(formik.values.quantity_per_unit);
    const finalTotal = isNaN(total) ? 0 : total;
    const finalQty = isNaN(quantity) ? 1 : quantity;
    const piece = finalTotal / finalQty;
    SetPiecePrice(piece.toFixed(2));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue('image', files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(previews);
  };

  const handleEditPro = async () => {
    try {
      let imageUrl = product.image;
      if (formik.values.image.length > 0) {
        await deleteImageFromStore(imageUrl);
        const imageUrls = await uploadImagesToSupabase(formik.values.image, 'products');
        imageUrl = imageUrls[0];
      }

      const updatedData = {
        ...formik.values,
        image: imageUrl,
        traderprice: Number(formik.values.traderprice),
        quantity_per_unit: Number(formik.values.quantity_per_unit),
      };

      await dispatch(updateProduct({ id: product.id, updatedData })).unwrap();
      setShow(false);
    } catch (error) {
      console.error("❌ Failed to update product:", error.message);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('اسم المنتج مطلوب'),
    description: Yup.string().required('الوصف مطلوب'),
    traderprice: Yup.number().required('السعر مطلوب').min(1),
    quantity_per_unit: Yup.number().required('الكمية لكل وحدة مطلوبة').min(1),
    category_id: Yup.string().required('التصنيف مطلوب'),
    unit: Yup.string().required('الوحدة مطلوبة'),
    company_id: Yup.string().required('الشركة مطلوبة'),
    trader_id: Yup.string().required('التاجر مطلوب'),
    image: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      traderprice: product?.traderprice || 0,
      category_id: product?.category_id || '',
      trader_id: product?.trader_id || '',
      company_id: product?.company_id || '',
      unit: product?.unit || '',
      quantity_per_unit: product?.quantity_per_unit || 1,
      image: [],
      state: product?.state ?? true,
    },
    validationSchema,
    onSubmit: handleEditPro,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (product) {
      getPriceOfPiece(product.traderprice);
    }
    // eslint-disable-next-line
  }, [product]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="AddProductModal">
        <Modal.Header>
          <Modal.Title>تعديل المنتج</Modal.Title>
          <button className="fa-solid fa-close border-0 bg-transparent CloseModalBtn" onClick={() => setShow(false)} />
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
                    <option value="">اختر التصنيف</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
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
                    {Units.map((unit) => (
                      <option key={unit.name} value={unit.name}>{unit.name}</option>
                    ))}
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
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </Form.Select>
                  {formik.touched.company_id && formik.errors.company_id && (
                    <div className="text-danger">{formik.errors.company_id}</div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>حالة المنتج</Form.Label>
                  <Form.Select
                    className={formik.values.state ? 'text-success' : 'text-danger'}
                    name="state"
                    value={formik.values.state}
                    onChange={(e) => formik.setFieldValue('state', e.target.value === 'true')}
                    onBlur={formik.handleBlur}
                  >
                    <option className="text-success" value={true}>متاح</option>
                    <option className="text-danger" value={false}>غير متاح</option>
                  </Form.Select>
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
                  <Form.Label>تحديث صورة المنتج</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                      }}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Button type="submit" className="btn-warning w-100 mt-4">
              حفظ التعديل
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductModal;