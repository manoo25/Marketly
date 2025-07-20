import React from 'react';
import dlvaryImg from "../../assets/Images/delivery_store_highres.png";
import tarackingImg from "../../assets/Images/ChatGPT Image Jul 20, 2025, 10_12_51 PM.png"
import orderImg from "../../assets/Images/ChatGPT Image Jul 20, 2025, 10_10_06 PM.png";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5">
            <div className="feature-card text-center">
              <img src={tarackingImg} alt="Suppliers" className="feature-image w-50 mb-3" />
              <h3 className="feature-title">تصفح الموردين</h3>
              <p className="feature-description">
                استعرض أفضل الموردين واختر الأنسب لمتجرك بسهولة وثقة.
              </p>
            </div>
          </div>
          <div className="col-lg-4 mb-5">
            <div className="feature-card text-center">
              <img src={orderImg} alt="Order" className="feature-image w-50 mb-3" />
              <h3 className="feature-title">اطلب المنتجات</h3>
              <p className="feature-description">
                اطلب المنتجات المطلوبة بضغطة زر وتابع حالة الطلب بسهولة.
              </p>
            </div>
          </div>
          <div className="col-lg-4 mb-5">
            <div className="feature-card text-center">
              <img src={dlvaryImg} alt="Delivery" className="feature-image w-50 mb-3" />
              <h3 className="feature-title">استلم التوصيلات</h3>
              <p className="feature-description">
                تصلك الشحنات بسرعة وفي الوقت المحدد بكل احترافية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
