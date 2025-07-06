import { useState, useRef, useEffect } from 'react';
import Logo from '../../src/assets/Images/Logo.png';
import * as bootstrap from 'bootstrap';
import SidebarLink from '../Components/LayoutComponents/sidebarLink';
import Nav from '../Components/LayoutComponents/Nav';
import { Outlet } from 'react-router-dom';


function Layout() {
  const [margin, setMargin] = useState('0');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const offcanvasRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById('offcanvasRight');
    if (el) {
      offcanvasRef.current = new bootstrap.Offcanvas(el, {
        backdrop: false,
        scroll: true,
      });
    }
  }, []);

  const handleToggleSidebar = () => {
    if (!offcanvasRef.current) return;

    if (isSidebarOpen) {
      offcanvasRef.current.hide();
      setMargin('0');
      setIsSidebarOpen(false);
    } else {
      offcanvasRef.current.show();
      setMargin('215px');
      setIsSidebarOpen(true);
  
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: 'var(--side-bar-color)' }}
        className="offcanvas offcanvas-end p-0 "
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="px-3 py-2">
          <div className="offcanvas-header p-0 m-0">
            <img
              style={{ width: '100px', height: '80px' }}
              src={Logo}
              alt="Logo"
            />
          </div>
          <hr
            style={{
              border: '1px solid var(--very-very-light-gray-color)',
              marginTop: '8px',
            }}
          />
        </div>

        <div className="offcanvas-body m-0  p-0">
          <SidebarLink />
        </div>
      </div>

      <div style={{ marginRight: margin }} className="pages position-relative pt-5 ">
     

       <div className="fixed fixed-top"  style={{ marginRight: margin }}>
         <Nav 
        handleToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
       
        />
       </div>

        {/* Routing Pages  */}
        <div className='bg-light p-4'>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Layout;
