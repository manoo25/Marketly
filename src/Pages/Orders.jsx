import { useOutletContext } from "react-router-dom";
import OrdersPageHeader from "../Components/OrdersComponents/ordersPageHeader";
import OrdersTbl from "../Components/OrdersComponents/ordersTbl";



function Orders() {
     const {  UserRole } = useOutletContext();
    return (
        <>
            <OrdersPageHeader />
            <OrdersTbl UserRole={UserRole} />
        </>

    );
}

export default Orders;