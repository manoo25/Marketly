
import AddProductModal from "../Components/modalsComponents/ProductModal";
import ProductsFilter from "../Components/ProductsComponents/ProductsFilter";
import ProductsPageHeader from "../Components/ProductsComponents/productsPageHeader";
import ProductsTbl from "../Components/ProductsComponents/ProductsTbl";
import NameSearch from "../Components/UsersComponents/FilteredComponents/NameSearch";
import UsersFilter from "../Components/UsersComponents/UsersFilter";


function Products() {
   
    return ( <>
    <ProductsPageHeader/>
  <ProductsTbl/>
    </> );
}

export default Products;