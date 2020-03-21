import React from "react";

import SEO from "../components/seo";
import Checkout from "../templates/checkout/Checkout";

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <SEO title="checkout page" />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
