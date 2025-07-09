import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagesToSupabase } from '../../Redux/uploadingImage';
import { GetCategories } from '../../Redux/Slices/Categories';
import { GetUnits } from '../../Redux/Slices/units';
import { fetchCompanies } from '../../Redux/Slices/CompaniesSlice';
import { deleteImageFromStore, updateProduct } from '../../Redux/Slices/ProductSlice'; // تأكد أنك عامل updateProduct

const EditProductModal = ({ product,show,setShow }) => {
  const [images, setImages] = useState(product?.image ? [product.image] : []);
//   const [show, setShow] = useState(false);
  const [PiecePrice, SetPiecePrice] = useState('');
  const [EndPrice, SetEndPrice] = useState('');
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.Categories);
  const { Units } = useSelector((state) => state.Units);
  const { companies } = useSelector((state) => state.Companies);

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetUnits());
    dispatch(fetchCompanies());
  }, []);

  const getPriceOfPiece = (price) => {
    const taxes = price * 0.02;
    const total = Number(price) + Number(taxes);
    SetEndPrice(total.toFixed(2));

    const quantity = Number(formik.values.quantity_per_unit);
    if (quantity > 0) {
      const pricePerPiece = total / quantity;
      SetPiecePrice(pricePerPiece.toFixed(2));
    } else {
      SetPiecePrice(0);
    }
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
      quantity: Number(formik.values.quantity),
      quantity_per_unit: Number(formik.values.quantity_per_unit),
      endprice: Number(EndPrice),
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
    quantity: Yup.number().required('الكمية مطلوبة').min(1),
    quantity_per_unit: Yup.number().required('الكمية لكل وحدة مطلوبة').min(1),
    category_id: Yup.string().required('التصنيف مطلوب'),
    unit: Yup.string().required('الوحدة مطلوبة'),
    company_id: Yup.string().required('الشركة مطلوبة'),
    trader_id: Yup.string().required('التاجر مطلوب'),
  });

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      traderprice: product?.traderprice || 0,
      quantity: product?.quantity || 1,
      category_id: product?.category_id || '',
      trader_id: product?.trader_id || '',
      company_id: product?.company_id || '',
      unit: product?.unit || '',
      quantity_per_unit: product?.quantity_per_unit || 1,
      image: [],
    },
    validationSchema,
    onSubmit: handleEditPro,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (product) {
      getPriceOfPiece(product.traderprice);
    }
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
      <Row className="gy-3">
        <Col md={6}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>اسم المنتج</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>التصنيف</Form.Label>
            <Form.Select
              name="category_id"
              value={formik.values.category_id}
              onChange={formik.handleChange}
            >
              <option value="">اختر التصنيف</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>الوحدة</Form.Label>
            <Form.Select
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
            >
              <option value="">اختر الوحدة</option>
              {Units.map((u) => (
                <option key={u.name} value={u.name}>{u.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>الشركة</Form.Label>
            <Form.Select
              name="company_id"
              value={formik.values.company_id}
              onChange={formik.handleChange}
            >
              <option value="">اختر الشركة</option>
              {companies.map((com) => (
                <option key={com.id} value={com.id}>{com.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>الكمية</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>الكمية للوحدة</Form.Label>
            <Form.Control
              type="number"
              name="quantity_per_unit"
              value={formik.values.quantity_per_unit}
              onChange={(e) => {
                formik.handleChange(e);
                getPriceOfPiece(formik.values.traderprice);
              }}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>السعر</Form.Label>
            <Form.Control
              type="number"
              name="traderprice"
              value={formik.values.traderprice}
              onChange={(e) => {
                formik.handleChange(e);
                getPriceOfPiece(e.target.value);
              }}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>السعر بعد الضريبة</Form.Label>
            <Form.Control value={EndPrice} readOnly />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>سعر القطعة</Form.Label>
            <Form.Control value={PiecePrice} readOnly />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group className="mb-3 text-end">
            <Form.Label>تحديث صورة المنتج</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              multiple
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
