import React from "react";
import "./testimonials.css";
import Avatar from "../../assets/Images/user.png";
function TestimonialCard({ testimonial }) {
  const {  feed_back, users } = testimonial;

  return (
    <div className="testimonial-card chat-style"  id="testimonials-section" >
      <div className="testimonial-header">
        {/* <span className="user-icon">👤</span> */}
        <img style={{ width: "40px", height: "40px" }} className="user-icon" src={Avatar} alt="Avatar" />
        <span className="testimonial-user">{users?.name || "مستخدم"}</span>
      </div>

      <div className="testimonial-feedback">
        <p>"{feed_back}"</p>
      </div>

     
    </div>
  );
}

export default TestimonialCard;
