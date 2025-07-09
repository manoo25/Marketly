
import AddUserModal from '../modalsComponents/UserModal'

function UsersPageHeader() {
  return (
    <>
      <header className="d-flex justify-content-between w-100 px-1 pt-3 pb-2">
        <h3>المستخدمين</h3>
        <AddUserModal />
      </header>
    </>
  )
}

export default UsersPageHeader;