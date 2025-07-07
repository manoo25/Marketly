import PrimaryButton from "../globalComonents/PrimaryButton";

function ProductsPageHeader() {
    return ( 
        <>
        <header className="d-flex justify-content-between w-100 px-1 pt-3"> 
<h3>المنتجات</h3>
<PrimaryButton
label="إضافة منتج"
icon='fa-solid fa-square-plus'
/>
        </header>
        </>
     );
}

export default ProductsPageHeader;