import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import DarkModeButton from "../components/DarkModeButton";
import Copyright from "../components/Copyright";

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <DarkModeButton />
        <main>{children}</main>
        <footer>
          <Copyright />
        </footer>
      </Box>
    </Container>
  );
};

export default Layout;
