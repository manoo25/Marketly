import React from 'react';
import dlvaryImg from "../../assets/Images/delivery_store_highres.png";
import tarackingImg from "../../assets/Images/ChatGPT Image Jul 20, 2025, 10_12_51 PM.png"
import orderImg from "../../assets/Images/ChatGPT Image Jul 20, 2025, 10_10_06 PM.png";
import "./features.css";

const features = [
  {
    img: tarackingImg,
    title: "تصفح الموردين",
    desc: "استعرض أفضل الموردين واختر الأنسب لمتجرك بسهولة وثقة."
  },
  {
    img: orderImg,
    title: "اطلب المنتجات",
    desc: "اطلب المنتجات المطلوبة بضغطة زر وتابع حالة الطلب بسهولة."
  },
  {
    img: dlvaryImg,
    title: "استلم التوصيلات",
    desc: "تصلك الشحنات بسرعة وفي الوقت المحدد بكل احترافية."
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="row mb-3">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 mb-5 mt-3">
              <div className="feature-card text-center fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <img src={feature.img} alt={feature.title} className="img-fluid" style={{ maxWidth: "100px", height: "auto" }} />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
