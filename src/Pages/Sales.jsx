import { useOutletContext } from "react-router-dom";
import SalesPageHeader from "../Components/SalesComponents/SalesPageHeader";
import SalesTbl from "../Components/SalesComponents/SalesTbl";

function Sales() {
    const {  UserRole } = useOutletContext();
    return (
        <>
            <SalesPageHeader />
            <SalesTbl UserRole={UserRole} />
        </>

    );
}

export default Sales;