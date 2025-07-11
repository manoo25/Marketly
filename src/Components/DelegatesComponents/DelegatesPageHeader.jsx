import AddDelegateModal from "../modalsComponents/AddDelegateModal";

function DelegatesPageHeader({users}) {
    return (
        <>
            <header className="d-flex justify-content-between w-100 px-1 pt-3">
                <h3>المناديب</h3>
                <AddDelegateModal users = {users}/>
            </header>
        </>
    );
}

export default DelegatesPageHeader;
