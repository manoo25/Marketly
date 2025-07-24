import { useOutletContext } from "react-router-dom";
import ReturnsPageHeader from '../Components/ReturnsComponents/returnsPageHeader';
import ReturnsTbl from '../Components/ReturnsComponents/returnsTbl';


function Returns() {
    const {  UserRole } = useOutletContext();
    return (
        <>
            <ReturnsPageHeader />
            <ReturnsTbl />
        </>
    );
}

export default Returns;
