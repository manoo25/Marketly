import React from "react";
import "./testimonials.css";

function TestimonialCard({ testimonial }) {
  const { rate, feed_back, users } = testimonial;

  return (
    <div className="testimonial-card chat-style">
      <div className="testimonial-header">
        <span className="user-icon">👤</span>
        <span className="testimonial-user">{users?.name || "مستخدم"}</span>
      </div>

      <div className="testimonial-feedback">
        <p>"{feed_back}"</p>
      </div>

      <div className="testimonial-stars">
        {Array.from({ length: rate }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </div>
  );
}

export default TestimonialCard;
