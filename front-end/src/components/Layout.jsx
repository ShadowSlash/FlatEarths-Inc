import Navigation from "./Navigation";
import Footer from "./Footer";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

import backgroundImage from "../assets/donald-giannatti-Wj1D-qiOseE-unsplash.jpg";

const Layout = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  if (!user.isLoggedIn) {
    navigate("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#222] text-white">
      {/* Outer container with flex column layout */}
      
      {/* Navigation at the top */}
      <Navigation />
      
      {/* Main content area with sidebars and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/6 bg-[#2C2C2C] p-6 shadow-lg transition-transform transform hover:scale-105 duration-300">
          {/* Left Sidebar with padding and shadow */}
          <LeftSidebar />
        </div>

        {/* Main Content Area */}
        <div
          className="flex-1 p-8 bg-[#1A1A1A] text-white rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 2s ease-in-out",
            opacity: 0.9,
            backdropFilter: "blur(10px)", // Optional: Adds a blur effect to the background image
          }}
        >
          {/* Main content area with dark background */}
          <h1 className="text-4xl font-bold text-[#00B5D8] mb-6 text-center">
            Truth Files
          </h1>
          
          {/* Renders the content passed to the Layout component */}
          {children}
        </div>

        {/* Right Sidebar */}
        <div className="w-1/6 bg-[#2C2C2C] p-6 shadow-lg transition-transform transform hover:scale-105 duration-300">
          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
