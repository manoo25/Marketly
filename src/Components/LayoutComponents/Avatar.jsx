
import '../../css/Avatar.css'
import avatar from "../../assets/Images/user.png"
function AvatarDropdown() {


  return (

<label className="popup">
  <input type="checkbox" />
  <div tabIndex="0" className="burger">
    <img src={avatar} alt="avatar"
    style={{
      width:'60px',
      height:'60px'
    }}
    />
  </div>
  <nav className="popup-window">
   
    <ul>
     
      <li>
        <button>
          <span className='mb-2'>الملف الشخصى</span>
         <span className='fa-regular fa-user  '></span>
          
        </button>
      </li>
      <li>
        <button>
          <span className='mb-2'>تسجيل خروج</span>
         <span className='fa-solid fa-right-from-bracket fa-rotate-180  '></span>
          
        </button>
      </li>
    </ul>
  </nav>
</label>

  );
}

export default AvatarDropdown;
