import React, { useState } from "react";
import {
  Avatar,
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo_the_flat_truth.png";


import { useUser } from "../contexts/UserContext";

export default function Navigation() {
  const [openNav, setOpenNav] = React.useState(false);
  
  // Capture a search query entered by the user
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  // Close mobile nav when window is resized above 960px
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  //-----------------------------------------Handle the search function -----------------------------------///
  const handleSearch = () => {
    if (searchQuery.trim()) {  // Check if the query is not empty
      // Navigate to the search results page with the search query as a URL parameter
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const navList = (
    <ul className="mt-10 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {user && user.isLoggedIn && (
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={() => navigate("/create")}
        >
          <span>New Post</span>
        </Button>
      )}
    </ul>
  );

  return (
    <div className="bg-[#3E3D4D] max-h-[768px] w-full">
      <Navbar className="bg-[#41414e] border-none sticky top-0 z-10 max-w-full py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="logo" className="h-12 lg:h-16" />
            </Link>
            <Typography
              as="a"
              href="/"
              className="mr-4 cursor-pointer py-1.5 font-semibold text-4xl text-[#17A9EE] uppercase tracking-wide"
            >
              The Flat Truth
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex w-full gap-2 md:w-max bg-[#3E3D4D]">
              {/* Search Input field */}
              <Input
                type="search"
                color="white"
                label="Find the Truth..."
                className="pr-30"
                value={searchQuery}  // ------ Bind searchquerry function to input field 
                onChange={(e) => setSearchQuery(e.target.value)}  //----- Update searchQuery state as user types
                containerProps={{
                  className: "min-w-[288px]",
                }}
              />
              {/*  Search Button with onClick handler */}
              <Button
                size="sm"
                color="blue"
                className="!absolute right-1 top-1 rounded"
                aria-label="Search"
                onClick={handleSearch}  // -----------------------Event handler that triggers the handleSearch function when clicked
              >
                Search
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mr-4">
            <div className="flex items-center gap-x-1">
              {user && user.isLoggedIn ? (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={logoutUser}
                  >
                    <span>Log Out</span>
                  </Button>

                  <Avatar
                    src={`https://i.pravatar.cc/50?u=${user.username}`}
                    alt="avatar"
                    variant="rounded"
                  />
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={() => navigate("/login")}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={() => navigate("/signup")}
                  >
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {!user || !user.isLoggedIn ? (
              <>
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  <span>Log In</span>
                </Button>
                <Button
                  fullWidth
                  variant="gradient"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  <span>Sign Up</span>
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                variant="text"
                size="sm"
                onClick={logoutUser}
              >
                <span>Log Out</span>
              </Button>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
