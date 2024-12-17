import React from "react";
import { Typography, Button } from "@mui/material";

//////////////////////////////// Navbar Component ///////////////////////////////////
const Navbar = () => {
  return (
    <nav className="bg-[#3E3D4D] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Typography variant="h6" className="font-bold">
          The-Flat-Truth
        </Typography>
        <div className="flex space-x-4">
          <Button
            variant="text"
            color="inherit"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
