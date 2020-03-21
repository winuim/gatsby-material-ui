import React from "react";

import SEO from "../components/seo";
import Dashboard from "../templates/dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <SEO title="dashboard page" />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
