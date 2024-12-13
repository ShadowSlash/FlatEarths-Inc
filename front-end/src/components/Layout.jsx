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
/////---------------------------------The Layout component to manipulate the page structure ---------------------------------////
return (
    <div className="flex flex-col min-h-screen">  {/* The outer container uses flex column */}
      
      {/* Navigation at the top */}
      <Navigation />  

      {/* Main content area with sidebars and content */}
      <div className="flex flex-1"> {/* This is a flex container for sidebars and main content */}
        
        {/* Left Sidebar */}
        <div className="w-1/5 bg-gray-200"> {/* Left sidebar. Th */}
          <LeftSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-4"> {/* This is the main content area, which takes up the remaining space */}
          {children} {/* Render the content passed to the Layout component */}
        </div>
        
        {/* Right Sidebar */}
        <div className="w-1/7 bg-gray-200"> {/* Right sidebar */}
          <RightSidebar />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />  
    </div>
  );
}
export default Layout;