import { useState, useRef, useEffect } from 'react';
import Logo from '../../src/assets/Images/Logo.png';
import * as bootstrap from 'bootstrap';
import SidebarLink from '../Components/LayoutComponents/sidebarLink';
import Nav from '../Components/LayoutComponents/Nav';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetToken } from '../Redux/Slices/token';

function Layout() {
  const [margin, setMargin] = useState('0');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [PageTitle, SetPageTitle] = useState('لوحة التحكم');

  const offcanvasRef = useRef(null);

  const { token, UserRole } = useSelector(state => state.Token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetToken());
  }, [dispatch]);

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
        <div className="px-3 py-0">
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

        <div className="offcanvas-body m-0 p-0 mt-0">
          <SidebarLink  SetPageTitle={SetPageTitle} />
        </div>
      </div>

      <div style={{ marginRight: margin }} className="pages position-relative pt-5">
        <div className="fixed fixed-top" style={{ marginRight: margin }}>
          <Nav 
            handleToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
            PageTitle={PageTitle}
          />
        </div>

        {/* Routing Pages */}
        <div className='bg-light' style={{ padding: '3rem'}}>
          <Outlet context={{ token, UserRole }} />
        </div>
      </div>
    </>
  );
}

export default Layout;