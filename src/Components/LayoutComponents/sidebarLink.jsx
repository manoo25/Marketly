import { useState } from "react";

function SidebarLink() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sidebarLinks = [
    { text: 'لوحة التحكم', icon: 'fa-solid fa-gauge' },
    { text:  'المستخدمين', icon: 'fa-solid fa-users' },
    { text: 'المنتجات', icon: 'fa-solid fa-box-open' },
    { text: 'الأصناف', icon: 'fa-solid fa-layer-group' },
       { text: 'المبيعات', icon: 'fa-solid fa-chart-line' }
  ];

  return (
    <>
      {sidebarLinks.map((link, index) => (
        <div
          key={index}
          className={` sidebarLink ${activeIndex === index ? 'ActivesidebarLink' : ''}`}
          onClick={() => setActiveIndex(index)}
        >
          <p><span className={link.icon}></span> {link.text}</p>
        </div>
      ))}
    </>
  );
}

export default SidebarLink;
