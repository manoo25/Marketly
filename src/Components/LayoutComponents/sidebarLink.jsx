import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SubMenu.css";
import { useSelector } from "react-redux";

function SidebarLink({ SetPageTitle }) {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const location = useLocation();
  const {  UserRole } = useSelector(state => state.Token);

  const sidebarLinks = [
    { text: 'لوحة التحكم', icon: 'fa-solid fa-gauge', path: '/Dashboard/Charts' },
    { text: 'المستخدمين', icon: 'fa-solid fa-users', path: '/Dashboard/Users', role: 'admin' },
    { text: 'المحادثات', icon: 'fa-solid fa-comments', path: '/Dashboard/Chats', role: 'admin' },
    { text: 'الأصناف والوحدات', icon: 'fa-solid fa-layer-group', path: '/Dashboard/Categories', role: 'admin' },
    { text: 'المبيعات', icon: 'fa-solid fa-chart-line', path: '/Dashboard/Sales' },
    { text: 'المناديب', icon: 'fa-solid fa-user-tie', path: '/Dashboard/Delegates' }, 
    { text: 'الشركات', icon: 'fa-solid fa-chart-line', path: '/Dashboard/companies', role: 'admin' },
    { text: 'الطلبات', icon: 'fa-solid fa-receipt', path: '/Dashboard/Orders' },
    { text: 'المرتجعات', icon: 'fa-solid fa-undo', path: '/Dashboard/Returns' },
    { text: 'الشكاوى', icon: 'fa-solid fa-undo', path: '/Dashboard/Complaints', role: 'admin' },
    { text: 'الآراء', icon: 'fa-solid fa-comment-dots', path: '/Dashboard/Feedback', role: 'admin' }
  ];

  const productsSubLinks = [
    { text: 'تقرير المنتجات', icon: 'fa-solid fa-table-list', path: '/Dashboard/Products' },
    { text: 'الأكثر مبيعا', icon: 'fa-solid fa-arrow-trend-up', path: '/Dashboard/Products/MostSellingProducts' },
  ];

  return (
    <>
      {/* لوحة التحكم فقط */}
      <Link
        to={sidebarLinks[0].path}
        onClick={() => {
          setIsProductsMenuOpen(false);
          SetPageTitle(sidebarLinks[0].text);
        }}
        className="text-decoration-none"
      >
        <div className={`sidebarLink ${location.pathname === sidebarLinks[0].path ? 'ActivesidebarLink' : ''}`}>
          <p><span className={sidebarLinks[0].icon}></span> {sidebarLinks[0].text}</p>
        </div>
      </Link>

      {/* المنتجات (دروب داون) */}
      <div
        className="sidebarLink"
        onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
        style={{ cursor: 'pointer' }}
      >
        <p>
          <span className="fa-solid fa-box-open"></span> المنتجات
          <span
            className="fa-solid fa-chevron-down dropdown-arrow"
            style={{
              transform: isProductsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
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

      {/* باقي العناصر (بداية من index 1) */}
      {sidebarLinks.slice(1).map((link, index) => {
        const showLink = !link.role || link.role === UserRole;
        if (!showLink) return null;

        return (
          <Link
            to={link.path}
            key={index + 1}
            onClick={() => {
              setIsProductsMenuOpen(false);
              SetPageTitle(link.text);
            }}
            className="text-decoration-none"
          >
            <div className={`sidebarLink ${location.pathname === link.path ? 'ActivesidebarLink' : ''}`}>
              <p><span className={link.icon}></span> {link.text}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default SidebarLink;
