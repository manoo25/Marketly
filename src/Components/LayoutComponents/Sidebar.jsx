import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/Images/logo.png';
import * as bootstrap from 'bootstrap';
import SidebarLink from './sidebarLink';
import Nav from './Nav';

function Sidebar() {
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem unde minima dolor beatae sunt doloremque? Accusamus iste eius delectus adipisci, quisquam id sint dolorum odit! Iste ea necessitatibus fuga recusandae vero quos repudiandae sequi error quibusdam magnam officiis, hic, quo aut dolorem, eaque unde dolore omnis quae. Quis hic nisi itaque adipisci rerum ea necessitatibus corporis dicta aspernatur? Officiis reiciendis voluptate laborum dignissimos suscipit dolor deserunt eius. Dolorum aspernatur dolor illum delectus voluptatum hic optio exercitationem cum. Fugiat molestiae odio maxime dolores, minima sunt tempora distinctio itaque sed quis aliquid, nesciunt provident alias numquam! Quos, nisi ipsa mollitia accusantium vitae, voluptatem magnam dolores vero amet aperiam animi, officia harum eos enim recusandae reiciendis dolor quod est a omnis perferendis natus earum. Atque eum velit iusto ipsa exercitationem, mollitia culpa corporis ipsum, laborum fuga perferendis eveniet alias nesciunt itaque reprehenderit eaque amet esse optio laudantium dolor accusantium molestias ab maiores vero. Iste, dolorem! Eaque aut nesciunt enim officia eveniet provident quasi ab nulla deserunt accusamus voluptatibus, voluptate cum, at laboriosam quas facere consectetur est similique ipsum possimus quaerat adipisci, dolorum exercitationem! Quia nesciunt recusandae cumque sunt! Praesentium consequatur adipisci quos voluptate et, ducimus excepturi amet nobis quia aliquam velit mollitia eaque nesciunt pariatur officiis commodi architecto sint ullam. Veritatis amet culpa adipisci, corrupti rem sit magnam sed praesentium labore minima eaque beatae, necessitatibus debitis laudantium at officia voluptates quisquam voluptatum? Officiis modi distinctio magni unde, amet, atque tempora eos vel rerum ut culpa saepe nam accusamus tenetur. Et amet, obcaecati beatae distinctio dolorum corporis quam delectus nulla nesciunt suscipit magni quae a. Assumenda illum nemo autem suscipit? Et eligendi adipisci placeat possimus aliquid unde accusantium quos aperiam consequatur iste, nobis esse repellat libero autem. Quidem laudantium eius soluta recusandae distinctio eveniet molestias tempore culpa. Adipisci assumenda facere, amet placeat veniam, fugiat, expedita esse temporibus consequatur illum rerum debitis velit blanditiis omnis nostrum cumque animi quaerat laboriosam. Officiis voluptatum magni, iste ipsam voluptas in non, voluptatibus placeat deleniti quod veritatis! Tempora accusamus consequatur ipsa earum assumenda at rerum, unde ea excepturi eligendi repudiandae atque ab illo velit ipsam, aliquid enim? Facilis ab, cum error doloribus exercitationem aut quae harum incidunt vel nihil nobis odio nesciunt est veniam. Itaque, enim corporis iusto consequuntur dolor laboriosam sit culpa inventore veniam corrupti, sunt eius dignissimos quibusdam magnam nihil? Quod nulla aut voluptate temporibus architecto eius, fugit quo quibusdam suscipit ab facere doloremque veniam! Magni aliquam, eos explicabo recusandae temporibus voluptate eligendi enim, voluptatem deserunt voluptates ut expedita sequi inventore tempora totam maiores incidunt repudiandae nisi iste ipsa ratione! Repellendus quaerat ab voluptate aspernatur eligendi pariatur odio eaque quos voluptatum natus reprehenderit, quod atque facilis eius ratione earum praesentium! Quis tempore aliquid expedita, debitis, esse fugiat minima fuga est nobis ipsa consequatur nulla quibusdam doloremque cupiditate ea, magnam culpa laudantium eum explicabo? Iste ratione nisi ab tempora ullam maiores dolore labore praesentium recusandae, deleniti modi quaerat earum incidunt voluptatum provident! Commodi, excepturi repellendus. Quo minima autem minus magnam consectetur esse quae, hic iure reiciendis nobis rerum!</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
