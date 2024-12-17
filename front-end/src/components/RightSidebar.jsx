import React from "react";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import BlogList from "../components/BlogList";

////----------------------------Right Hand Sidebar Component -------------------------------------------------------------------///
const RightSidebar = () => {
  return (
    <aside className="min-w-fit p-4 flex flex-col">
      {/* Top of the Right hand SideBar: Friends List */}
      <div className="flex flex-col mb-6">
        <h3 className="font-bold text-xl text-[#17A9EE] mb-4">Friends List</h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/john"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                John Doe
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/jane"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Janet Smith
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/mark"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Eli Musket
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* ---------------------------- AI Component Component --------------------------------------------  */}
      <div className="flex flex-col mb-6">
        <h3 className="font-bold text-xl text-[#17A9EE] mb-4">
          Conspiracy generator
        </h3>
      </div>
    </aside>
  );
};

export default RightSidebar;
