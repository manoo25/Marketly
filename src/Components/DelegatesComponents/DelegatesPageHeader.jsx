import { useSelector } from "react-redux";
import AddGovernorateModal from "../DistributionRoutes/AddGovernorateModal";
import AddDelegateModal from "../modalsComponents/AddDelegateModal";

function DelegatesPageHeader({users}) {
    const { UserRole } = useSelector(state => state.Token);
    
    return (
        <>
            <header className="d-flex justify-content-between w-100 px-1 pt-3">
                <h3>المناديب</h3>
                <div style={{ display:"flex",gap:10 }}>
                    {UserRole == "trader" && <AddGovernorateModal />}
                    {UserRole == "trader" && <AddDelegateModal users={users} />}
                </div>
            </header>
        </>
    );
}

export default DelegatesPageHeader;
