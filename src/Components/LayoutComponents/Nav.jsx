
import AvatarDropdown from "./Avatar";
import Arrow from "../../assets/Images/Arrow.png";

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
          className="btn d-flex align-items-center gap-2 border-0 "
          type="button"
          onClick={handleToggleSidebar}
        >
<span>
            <img
  src={Arrow}
  style={{ width: '22px', height: '22px' }}
  className={`NavArrow-icon ${!isSidebarOpen ? 'rotated' : ''}`}
/>
</span>

         <span style={{fontSize:'18px',fontWeight:'500'}} className="pt-2"> {PageTitle}</span>
        </button>
<div className=" d-flex align-items-center position-relative">
      
    <AvatarDropdown/>  
</div>
        </nav>
     );
}

export default Nav;