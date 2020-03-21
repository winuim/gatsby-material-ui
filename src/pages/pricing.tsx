import React from "react";

import SEO from "../components/seo";
import Pricing from "../templates/pricing/Pricing";

const PricingPage: React.FC = () => {
  return (
    <div>
      <SEO title="pricing page" />
      <Pricing />
    </div>
  );
};

export default PricingPage;
