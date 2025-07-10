import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SubMenu.css"
function SidebarLink({ SetPageTitle }) {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const location = useLocation();

  const sidebarLinks = [
    { text: 'لوحة التحكم', icon: 'fa-solid fa-gauge', path: '/Dashboard/Charts' },
    { text: 'المستخدمين', icon: 'fa-solid fa-users', path: '/Dashboard/Users' },
    { text: 'الأصناف', icon: 'fa-solid fa-layer-group', path: '/Dashboard/Categories' },
    { text: 'المبيعات', icon: 'fa-solid fa-chart-line', path: '/Dashboard/Sales' },
    { text: 'الشركات', icon: 'fa-solid fa-chart-line', path: '/Dashboard/companies' },
    { text: 'الطلبات', icon: 'fa-solid fa-receipt', path: '/Dashboard/Orders' },
    { text: 'المرتجعات', icon: 'fa-solid fa-undo', path: '/Dashboard/Returns' }
  ];

  const productsSubLinks = [
    { text: 'تقرير المنتجات', icon: 'fa-solid fa-table-list', path: '/Dashboard/Products' },
    { text: 'الأكثر مبيعا', icon: 'fa-solid fa-arrow-trend-up', path: '/Dashboard/Products/MostSelling' },
  
  ];

  return (
    <>
      {/* أول عنصرين */}
      {sidebarLinks.slice(0, 2).map((link, index) => (
        <Link to={link.path} key={index}
          onClick={() => {
            setIsProductsMenuOpen(false);
            SetPageTitle(link.text)}}
          className="text-decoration-none"
        >
          <div className={`sidebarLink ${location.pathname === link.path ? 'ActivesidebarLink' : ''}`}>
            <p><span className={link.icon}></span> {link.text}</p>
          </div>
        </Link>
      ))}

      {/* المنتجات (دروب منيو) */}
      <div
        className={`sidebarLink ${productsSubLinks.some(item => location.pathname === item.path)
            ? ''
            : ''
          }`}
        onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
        style={{ cursor: 'pointer' }}
      >
        <p><span className="fa-solid fa-box-open"></span> المنتجات
        <span
            className="fa-solid fa-chevron-down dropdown-arrow"
            style={{
              transform: isProductsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',}}
        ></span>
        
        </p>
      </div>

      {/* روابط المنتجات الفرعية */}
      
        <div className={`products-submenu transition-submenu ${isProductsMenuOpen ? 'open' : 'closed'}`}>
          {productsSubLinks.map((sublink, idx) => (
            <Link
              to={sublink.path}
              key={idx}
              className="text-decoration-none"
              onClick={() => SetPageTitle(sublink.text)}
            >
              <div className={`sidebarLink subLink ${location.pathname === sublink.path ? 'ActivesidebarLink' : ''}`}>
                <p><span className={sublink.icon}></span> {sublink.text}</p>
              </div>
            </Link>
          ))}
        </div>

      {/* باقي العناصر */}
      {sidebarLinks.slice(2).map((link, index) => (
        <Link to={link.path} key={index + 2}
          onClick={() => {
            setIsProductsMenuOpen(false);
            SetPageTitle(link.text)}}
          className="text-decoration-none"
        >
          <div className={`sidebarLink ${location.pathname === link.path ? 'ActivesidebarLink' : ''}`}>
            <p><span className={link.icon}></span> {link.text}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default SidebarLink;
