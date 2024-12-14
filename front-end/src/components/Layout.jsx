import Navigation from "./Navigation";
import Footer from "./Footer";
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';  
import RightSidebar from './RightSidebar'; 

const Layout = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user.isLoggedIn) {
    navigate('/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#395E7A] text-white">  {/* Outer container with flex column layout */}
      
      {/* Navigation at the top */}
      <Navigation />  

      {/* Main content area with sidebars and content */}
      <div className="flex flex-1 overflow-hidden"> {/* Flex container for sidebars and main content */}
        
        {/* Left Sidebar */}
        <div className="w-1/6 bg-[#395E7A] p-6 shadow-lg"> {/* Left Sidebar with padding and shadow */}
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-[#2E2936] overflow-auto"> {/* Main content area with dark background */}
          <h1 className="text-4xl font-semibold text-[#48D591] mb-6 text-center">Dashboard</h1> {/* Dashboard title */}
          {children} {/* Renders the content passed to the Layout component */}
        </div>
        
        {/* Right Sidebar */}
        <div className="w-1/6 bg-[#395E7A] p-6 shadow-lg"> {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />  
    </div>
  );
}

export default Layout;