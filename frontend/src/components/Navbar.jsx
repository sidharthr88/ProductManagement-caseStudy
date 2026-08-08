import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Management
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Products
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/add-product"
          >
            Add Product
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
