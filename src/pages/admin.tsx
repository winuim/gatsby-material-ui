import React from "react";

import SEO from "../components/Seo";
import Dashboard from "../templates/dashboard/Dashboard";

const AdminPage: React.FC = () => {
  return (
    <div>
      <SEO title="Admin page" />
      <Dashboard />
    </div>
  );
};

export default AdminPage;
