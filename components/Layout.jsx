import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductContext } from "./ProductContext";

const Layout = ({ children }) => {
  const { setSelectedProducts } = useContext(ProductContext);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);
  return (
    <div>
      <div className="p-5">
        {success && (
          <div className="bg-green-400 mb-5 rounded-xl p-5 text-white text-lg">
            Thank for your order!
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
