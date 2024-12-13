import React from 'react';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import BlogList from '../components/BlogList'; 


////----------------------------Right Hand Sidebar Component -------------------------------------------------------------------///
const RightSidebar = () => {
    return (
        <aside className="min-w-fit bg-[#353545]  p-4 flex flex-col">
             {/* Top of the Right hand SideBar: Friends List */}
             <div className="flex flex-col mb-6">
                <h3 className="font-bold text-xl text-[#48D591] mb-4">Friends List</h3>
                <nav>
                     <ul>
                        <li><a href="/friends/john" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">John Doe</a></li>
                        <li><a href="/friends/jane" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Janet Smith</a></li>
                        <li><a href="/friends/mark" className="block mb-2 text-[#8ED5ED] hover:text-[#48D591] transition-colors duration-300">Eli Musket</a></li>
                    </ul>
                </nav>
            </div>


             {/* ---------------------------- AI Component Component --------------------------------------------  */}
             <div className="flex flex-col mb-6">
                <h3 className="font-bold text-xl text-[#48D591] mb-4">Conspiracy generator</h3>
               
            </div>


        </aside>
    )

}

export default RightSidebar;