
import '../../css/Avatar.css'
import avatar from "../../assets/Images/user.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AvatarDropdown() {
  
     const { userData } = useSelector(state => state.Token);
     
     const UserImage = userData?.image;
   
const navigate = useNavigate();
function Logout() {
  navigate("/");  
   window.location.reload();
  sessionStorage.removeItem('userID');
}

  return (

<label className="popup">
  <input type="checkbox" />
  <div tabIndex="0" className="burger">
    <img src={UserImage?UserImage:avatar} alt="avatar"
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
        <button onClick={Logout}>
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
