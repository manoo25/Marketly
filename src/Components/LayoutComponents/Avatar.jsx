import React from 'react';
import Logo from '../../assets/Images/logo.png';
import '../../css/Avatar.css'
import avatar from "../../assets/Images/user.png"
function AvatarDropdown() {


  return (

<label class="popup">
  <input type="checkbox" />
  <div tabindex="0" class="burger">
    <img src={avatar} alt="avatar"
    style={{
      width:'60px',
      height:'60px'
    }}
    />
  </div>
  <nav class="popup-window">
   
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
