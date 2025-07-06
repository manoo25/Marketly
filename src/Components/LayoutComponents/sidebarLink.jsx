import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarLink({SetPageTitle}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarLinks = [
    { text: 'لوحة التحكم', icon: 'fa-solid fa-gauge', path: '/Dashboard/Charts' },
    { text: 'المستخدمين', icon: 'fa-solid fa-users', path: '/Dashboard/Users' },
    { text: 'المنتجات', icon: 'fa-solid fa-box-open', path: '/Dashboard/Products' },
    { text: 'الأصناف', icon: 'fa-solid fa-layer-group', path: '/Dashboard/Categories' },
    { text: 'المبيعات', icon: 'fa-solid fa-chart-line', path: '/Dashboard/Sales' }
  ];

  return (
    <>
      {sidebarLinks.map((link, index) => (
        <Link to={link.path} key={index} 
       onClick={() => {
    setActiveIndex(index);
    SetPageTitle(link.text);
  }}
        className="text-decoration-none">
          <div className={`sidebarLink ${activeIndex === index ? 'ActivesidebarLink' : ''}`}>
            <p><span className={link.icon}></span> {link.text}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default SidebarLink;
