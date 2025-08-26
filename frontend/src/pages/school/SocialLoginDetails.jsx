import React from "react";
import "./SocialLoginDetails.css";

const SocialLoginDetails = ({ onClose }) => {
  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2>Login Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <hr />

        <form className="login-form">
          <div>
            <label>User Type</label>
            <input type="text" value="Coach" readOnly />
          </div>

          <div>
            <label>User Name</label>
            <input type="text" value="Coach@SVS" readOnly />
          </div>

          <div>
            <label>Password</label>
            <input type="password" value="Coach@1995" readOnly />
          </div>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocialLoginDetails;
