import AddCompanyModal from "../modalsComponents/CompaniesModal";

function CompaniesPageHeader() {
  return (
    <>
      <header className="d-flex justify-content-between w-100 px-1 pt-3">
        <h3>الشركات</h3>
        <AddCompanyModal />
      </header>
    </>
  );
}

export default CompaniesPageHeader;
