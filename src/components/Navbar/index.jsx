import React from "react";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img
            src="https://logodix.com/logo/1707127.png"
            alt="logo"
            className="imageLogo"
          />
          <h5 className="textLogo">Admin</h5>
        </div>
      </div>
    </>
  );
};

export default Navbar;
