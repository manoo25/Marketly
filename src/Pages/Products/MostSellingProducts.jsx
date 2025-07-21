import { useOutletContext } from "react-router-dom";
import MostSellingPageHeader from "../../Components/ProductsComponents/MostSellingPageHeader";
import MostSellingTbl from "../../Components/ProductsComponents/MostSellingTbl";



function MostSellingProducts() {
      const {  UserRole } = useOutletContext();
    return (<>
        <MostSellingPageHeader/>
        <MostSellingTbl UserRole={UserRole}/>
    </> );
}

export default MostSellingProducts;