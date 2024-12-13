
import React from 'react';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import BlogList from '../components/BlogList'; 

//////////--------------------- Left Side Bar Component --------------------------------------------------//////

const LeftSidebar = () => {
    return (
        <aside className="min-w-fit p-4 flex flex-col">
              {/*--------------------- Newest Posts and Settings component -------------------------------------*/}
            <div className="flex flex-col mb-6">
                <h3 className="font-bold text-2xl text-[#353545] mb-5">Newest Conspiracies </h3>
                <nav>
                    <ul>
                        <li><a href="/post/1" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Post Title 1</a></li>
                        <li><a href="/post/2" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Post Title 2</a></li>
                        <li><a href="/post/3" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Post Title 3</a></li>
                    </ul>
                </nav>
                {/*--------------------- Settings sub component -------------------------------------*/}
                <h3 className="font-bold text-2xl text-[#395E7A] mt-6 mb-4">Settings</h3>
                    <nav>
                        <ul>
                            <li><a href="/profile/settings" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Profile Settings</a></li>
                            <li><a href="/account/settings" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Account Settings</a></li>
                        </ul>
                    </nav>
          
            </div> 
                            {/* -----------------Bottom Section My Posts component --------------------------------- */}
            <div className="mt-auto">
                        <h3 className="font-bold text-xl mb-4">My Posts</h3>
                <nav>
                    <ul>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/my-posts/1" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">My Post 1</a></li>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/my-posts/2" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">My Post 2</a></li>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/my-posts/3" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">My Post 3</a></li>
                    </ul>
                </nav>
            </div>
        </aside>
  );
};

export default LeftSidebar;
            

