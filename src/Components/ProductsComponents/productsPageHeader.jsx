import AddProductModal from "../modalsComponents/AddProductModal";

function ProductsPageHeader() {
  return (
    <>
      <header className="d-flex justify-content-between w-100 px-1 pt-3">
        <h3>المنتجات</h3>
        <AddProductModal />
      </header>
    </>
  );
}

export default ProductsPageHeader;
