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
                <h3 className="font-bold text-xl mb-4">Friends List</h3>
                <nav>
                     <ul>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/friends/john" className="block mb-2 text-blue-gray-600">John Doe</a></li>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/friends/jane" className="block mb-2 text-blue-gray-600">Janet Smith</a></li>
                        <li className="hover:bg-[#8ED5ED] p-2"><a href="/friends/mark" className="block mb-2 text-blue-gray-600">Eli Musket</a></li>
                    </ul>
                </nav>
            </div>


             {/* ---------------------------- AI Component Component --------------------------------------------  */}



        </aside>
    )

}

export default RightSidebar;