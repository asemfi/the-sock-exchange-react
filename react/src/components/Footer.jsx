import React from "react";

const Footer = ({ className, children }) => {
  return (
    <footer className={`w-100 py-3 text-center ${className}`}>
      {children}
    </footer>
  );
};

export default Footer;
