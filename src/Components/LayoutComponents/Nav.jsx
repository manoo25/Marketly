
import AvatarDropdown from "./Avatar";

function Nav({handleToggleSidebar,isSidebarOpen,PageTitle}) {
    
    return ( 
        <nav style={{
            backgroundColor:"var(--white-color)",
            height:"10vh",
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'0 20px',
            position:'relative',          
            left:0,
            width:'100%'
            }}>
                 <button
          className="btn d-flex align-items-baseline gap-3 border-0"
          type="button"
          onClick={handleToggleSidebar}
        >
          <span
            style={{ fontSize: 20 }}
            className={`fa-regular fa-square-caret-${isSidebarOpen ? 'right' : 'left'}`}
          ></span>
          {PageTitle}
        </button>
<div className=" d-flex align-items-center position-relative">
      
    <AvatarDropdown/>  
</div>
        </nav>
     );
}

export default Nav;