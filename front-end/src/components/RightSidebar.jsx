import React from "react";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import BlogList from "../components/BlogList";

const RightSidebar = () => {
  //Nested generate Conspiracy function
  const generateConspiracy = () => {
    alert("Generating a random conspiracy theory...");    /// <------------Replace with API from
    
  };

  return (
    <aside className="min-w-fit p-4 flex flex-col">
      {/* Top of the Right hand SideBar: Friends List */}
      <div className="flex flex-col mb-6">
        <h3 className="text-center font-bold text-xl text-[#17A9EE] mb-4">Friends List</h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/john"
                className="text-center  block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                John Doe
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/jane"
                className="text-center block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Janet Smith
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/mark"
                className="text-center block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Eli Musket
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* AI Component: Conspiracy generator */}
      <div className="flex flex-col mb-6">
        <h3 className="text-center  font-bold text-xl text-[#17A9EE] mb-4">
          Conspiracy Generator
        </h3>
        <button
          onClick={generateConspiracy}
          className="block my-1 text-[#62DD97] font-extrabold hover:text-[#26D9FF] transition-colors duration-300"
        >
          Generate Conspiracy
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
