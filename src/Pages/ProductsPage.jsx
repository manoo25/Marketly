
import AddProductModal from "../Components/modalsComponents/ProductModal";
import ProductsPageHeader from "../Components/ProductsComponents/productsPageHeader";
import ProductsTbl from "../Components/ProductsComponents/ProductsTbl";
import NameSearch from "../Components/UsersComponents/FilteredComponents/NameSearch";
import UsersFilter from "../Components/UsersComponents/UsersFilter";


function Products() {
   
    
    return ( <>
    <ProductsPageHeader/>
    <NameSearch/>
  <ProductsTbl/>
    </> );
}

export default Products;