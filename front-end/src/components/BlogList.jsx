import React, { useEffect, useState } from "react";
import api from "../api/axios.jsx";
// import api from "../mock/mock"; //<------------Using the Mock api script whilst the backend work is in progress
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  // State to store posts
  const [posts, setPosts] = useState([]);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  const onReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  // Function to get posts
  const getPosts = async () => {
    const response = await api.get("/blog/");
    console.log(response.data);
    if (response.data.status) {
      setPosts(response.data.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/blog/delete/${id}/`);
      console.log(response.data);
      if (response.data.status) {
        // setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    getPosts();
  };

  // Load posts on component mount
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="container mx-auto px-8 py-10 flex justify-between flex-wrap ">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          date={post.published_date}
          text={post.text}
          url={post.url}
          onReadMore={onReadMore}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default BlogList;
