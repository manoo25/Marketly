
import ProductsFilter from "../Components/ProductsComponents/ProductsFilter";
import ProductsPageHeader from "../Components/ProductsComponents/productsPageHeader";
import ProductsTbl from "../Components/ProductsComponents/ProductsTbl";
import NameSearch from "../Components/UsersComponents/FilteredComponents/NameSearch";
import UsersFilter from "../Components/UsersComponents/UsersFilter";
import { useOutletContext } from "react-router-dom";


function Products() {
   const {  UserRole } = useOutletContext();
    return ( <>
    <ProductsPageHeader/>
  <ProductsTbl UserRole={UserRole}/>
    </> );
}

export default Products;