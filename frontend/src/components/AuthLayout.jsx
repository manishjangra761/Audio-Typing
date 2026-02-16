import React from "react";
import "../styles/Register.css";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="page-bg">
      <div className="register-layout">

        {/* LEFT SIDE */}
        <div className="left-content">
          <h1>Boost Your Typing Skills</h1>
          <p>
            Practice with real audio tests and improve
            speed, accuracy and confidence.
          </p>

          <ul>
            <li>✔ Real exam audio</li>
            <li>✔ Instant accuracy check</li>
            <li>✔ Progress tracking</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-form-container">
          <form className="register-form">
            <h2 className="form-title">{title}</h2>
            {children}
          </form>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
