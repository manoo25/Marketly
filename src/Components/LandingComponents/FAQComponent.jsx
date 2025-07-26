import React, { useState } from "react";
import "./FAQCSS.css";

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "ما هو مارکتلي وكيف يعمل؟",
      answer:
        "مارکتلي هي منصة B2B تربط أصحاب متاجر البقالة بالموردين المعتمدين. نوفر طريقة سهلة لطلب المنتجات وإدارة المخزون واستلام التوصيلات في الوقت المحدد.",
    },
    {
      question: "كم مدة التوصيل؟",
      answer:
        "نضمن التوصيل في خلال 24-48 ساعة من تأكيد الطلب. للطلبات العاجلة، يمكن التوصيل في نفس اليوم حسب المنطقة ونوع المنتجات.",
    },
    {
      question: "هل يمكنني إرجاع المنتجات؟",
      answer:
        "نعم، لديك 7 أيام لإرجاع أي منتجات غير مطابقة للمواصفات أو تالفة. فريق خدمة العملاء متاح على مدار الساعة لمساعدتك في عملية الإرجاع.",
    },
    {
      question: "كيف أضمن جودة المنتجات؟",
      answer:
        "جميع الموردين على منصتنا معتمدين ومفحوصين بعناية. نتابع جودة المنتجات باستمرار ولدينا نظام تقييم شفاف لضمان حصولك على أفضل المنتجات.",
    },
    {
      question: "كيف يمكنني التسجيل لأول مرة في المنصة؟",
      answer:
        "التسجيل بسيط جداً! اضغط على 'ابدأ الآن' واملأ البيانات الأساسية لمتجرك. سيتواصل معك فريقنا خلال 24 ساعة لتفعيل حسابك.",
    },
    {
      question: "كيف يتم الدفع؟",
      answer:
        "في الوقت الحالي نوفر الدفع نقدًا عند الاستلام فقط، لضمان سهولة وسرعة التعامل. قريبًا سنوفر أيضًا الدفع الإلكتروني والتحويل البنكي لتسهيل العمليات على جميع عملائنا.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-component">
      <div className="container">
        <h2 className="section-title">الأسئلة الشائعة</h2>
        <p className="section-subtitle">
          إجابات على الأسئلة التي قد تخطر ببالك
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-header ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="faq-number">{index + 1}</div>
                    <span>{faq.question}</span>
                  </div>
                  <span
                    className={`faq-icon ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-content ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  <p className="faq-text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;
