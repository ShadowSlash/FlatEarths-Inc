import React from "react";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import BlogList from "../components/BlogList";
import axios from "axios";


//////////--------------------- Left Side Bar Component --------------------------------------------------//////

const LeftSidebar = () => {





  return (
    <aside className="min-w-fit p-4 flex flex-col">
      {/*--------------------- Newest Posts and Settings component -------------------------------------*/}
      <div className="flex flex-col mb-6">
        <h3 className="font-bold text-2xl text-[#17A9EE] mb-5">
          Newest Conspiracies{" "}
        </h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/post/1"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Post Title 1
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/post/2"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Post Title 2
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/post/3"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Post Title 3
              </a>
            </li>
          </ul>
        </nav>
        {/*--------------------- Settings sub component -------------------------------------*/}
        <h3 className="font-bold text-2xl text-[#17A9EE] mt-6 mb-4">
          Settings
        </h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/profile/settings"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Profile Settings
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/account/settings"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                Account Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* -----------------Bottom Section My Posts component --------------------------------- */}
      <div className="mt-auto">
        <h3 className="font-bold text-xl text-[#17A9EE] mb-4">My Posts</h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/my-posts/1"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                My Post 1
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/my-posts/2"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                My Post 2
              </a>
            </li>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/my-posts/3"
                className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
              >
                My Post 3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
