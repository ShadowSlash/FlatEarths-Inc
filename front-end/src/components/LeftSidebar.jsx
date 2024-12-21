import React, { useEffect } from "react";
import axios from "axios";

//////////--------------------- Left Side Bar Component --------------------------------------------------//////

const LeftSidebar = () => {
  const [newestPosts, setNewestPosts] = React.useState([]);
  const [myPosts, setMyPosts] = React.useState([]);

  // Fetch data for 'myPosts' and 'newestPosts' when the component is mounted
  useEffect(() => {
    // Fetch my posts
    axios
      .get('http://localhost:8000/api/posts/')
      .then((response) => {
        // Make sure response is an array before setting state
        if (Array.isArray(response.data)) {
          setMyPosts(response.data);
        } else {
          console.error("Expected an array of posts, but got:", response.data);
        }
      })
      .catch((error) => console.error('Error fetching my posts:', error));

    // Fetch newest posts
    axios
      .get('http://localhost:8000/api/posts/')
      .then((response) => {
        // Ensure response is an array
        if (Array.isArray(response.data)) {
          setNewestPosts(response.data);
        } else {
          console.error("Expected an array of newest posts, but got:", response.data);
        }
      })
      .catch((error) => console.error('Error fetching newest posts:', error));
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <aside className="min-w-fit p-4 flex flex-col">
      {/*--------------------- Newest Posts and Settings component -------------------------------------*/}
      <div className="flex flex-col mb-6">
        <h3 className="font-bold text-2xl text-[#17A9EE] mb-5">
          Newest Conspiracies{" "}
        </h3>
        <nav>
          <ul>
            {Array.isArray(newestPosts) && newestPosts.length > 0 ? (
              newestPosts.map((post) => (
                <li className="hover:bg-[#49485a] p-2 rounded-lg" key={post.id}>
                  <a
                    href={`/post/${post.id}`}
                    className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
                  >
                     <h1 className="text-lg font-semibold mb-2">{post.title}</h1> {/* The sidebar post title, mian text and publish date */}
        <p className="text-sm text-gray-300 mb-2">{post.text}</p> 
        <span className="text-xs text-gray-200">{post.published_date}</span>
                  </a>
                </li>
              ))
            ) : (
              <p>No posts available</p>
            )}
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
            {Array.isArray(myPosts) && myPosts.length > 0 ? (
              myPosts.map((post) => (
                <li className="hover:bg-[#49485a] p-2 rounded-lg" key={post.id}>
                  <a
                    href={`/my-posts/${post.id}`}
                    className="block my-1 text-[#62DD97] hover:text-[#26D9FF] transition-colors duration-300"
                  >
                    {post.title}
                    {post.text}
                    {post.published_date}
                  </a>
                </li>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
