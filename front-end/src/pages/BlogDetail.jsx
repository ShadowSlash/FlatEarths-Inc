import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import dayjs from "dayjs";

import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import Layout from "../components/Layout";

const NewBlogPage = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  // Function to get the post based on the id passed in the URL
  const getPost = async () => {
    const response = await api.get(`/blog/get/${params.id}`);
    console.log(response.data);
    if (response.data) {
      setPost(response.data);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Layout>
      <section className="container mx-auto px-8 py-5">
        <Card
          shadow={false}
          className="border border-gray-300 rounded-2xl w-full"
        >
          <CardBody>
            <div className="flex lg:gap-0 gap-6 flex-wrap flex-col justify-between items-center">
              {post ? (
                <>
                  <Typography color="blue-gray" variant="h2" className="mb-4">
                    {post.title}
                  </Typography>

                  <Typography color="blue-gray" variant="">
                    {post.text}
                  </Typography>

                  <Typography color="blue-gray" variant="">
                    {post.name}
                  </Typography>

                  
                  <Typography color="blue-gray" variant="">
                    {post.name}
                  </Typography>

                  <div className="flex justify-between  w-full hr p-3">
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        alt="avatar"
                      />
                      <div className="flex  flex-col p-2">
                        <Typography color="blue-gray" variant="small">
                          {dayjs(post.published_date).format("MMMM D, YYYY")}
                        </Typography>
                        <Typography color="blue-gray" variant="small">
                          By: John Doe
                        </Typography>
                      </div>
                    </div>

                    <IconButton variant="text" color="blue-gray" size="sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                      >
                        <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
                      </svg>
                    </IconButton>
                  </div>
                </>
              ) : (
                <Typography color="red">Post not found</Typography>
              )}
            </div>
          </CardBody>
        </Card>
      </section>
    </Layout>
  );
};

export default NewBlogPage;
