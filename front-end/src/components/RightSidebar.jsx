import React, { useState } from "react";
import axios from "axios";

const RightSidebar = () => {
  const [joke, setJoke] = useState(""); // State to hold the joke

  // -------------------------- Function to fetch a random joke from the backend API --------------
  const generateJoke = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blogapp/generate-joke/");

      if (response.data.status) {
        setJoke(response.data.joke); // Set the joke in the state
      } else {
        alert("Failed to fetch a joke.");
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      alert("An error occurred while fetching the joke.");
    }
  };

  return (
    <aside className="min-w-full sm:max-w-md lg:max-w-lg p-4 flex flex-col">
      {/* Top of the Right hand SideBar: Friends List */}
      <div className="flex flex-col mb-6">
        <h3 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl text-[#17A9EE] mb-4">
          Friends List
        </h3>
        <nav>
          <ul>
            <li className="hover:bg-[#49485a] p-2 rounded-lg">
              <a
                href="/friends/john"
                className="text-center block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
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

      {/* AI Component: Joke generator */}
      <div className="flex flex-col mb-6">
        <h3 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl text-[#17A9EE] mb-4">
          Generate a Conspiracy
        </h3>
        <button
          onClick={generateJoke} // Trigger joke fetch when clicked
          className="block my-1 text-[#62DD97] font-extrabold hover:text-[#26D9FF] transition-colors duration-300"
        >
          Generate Conspiracy
        </button>

        {/* Display the joke if one is fetched */}
        {joke && (
          <div className="mt-4 text-center text-[#62DD97] font-medium">
            <p>{joke}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
