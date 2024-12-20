import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

import {formatDate} from '../util/date';

import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
  IconButton,
  Alert
} from "@material-tailwind/react";

import Layout from '../components/Layout';
 
const NewBlogPage = () =>{

  const [newPost, setNewPost] = useState({});
  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  const displayError = (message) => {
    // clear after 2 seconds
    setTimeout(() => {
      setError('');
    }, 2000);
    setError(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  const validateArticle = () => {

    if (!newPost.title || !newPost.description) {
      displayError('Please enter a title and description for your blog post.');
      return false;
    }
    return true;
  };


  const onCancel = () => {
    navigate('/dashboard');
  };

  const onNewPostSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has entered a title and description
    if (!validateArticle()) {
      return;
    }

    try {
      const data = {
        title: newPost.title,
        text: newPost.description,
        created_date: formatDate(new Date()),
        published_date: formatDate(new Date()),
        author: 2
      };

      console.log(data);
      const response = await api.post('/blog/add/', data);
      
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-8 py-5">
        {error && (
          <Alert>{error}</Alert>)}
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
      >
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <div>
                <Typography color="gray" variant="h6">
                  Write a new Blog Post
                </Typography>
              </div>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-black-600 my-6"
          >
            Enter a title and start writing your blog post.
          </Typography>
           <Typography
            variant="small"
            className="font-normal text-red-600 my-6"
          > Hint: You can use Markdown to format your post.
          </Typography>
        </CardBody>
      </Card>
    </section>

    <section className="container mx-auto px-8 py-5">
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl w-full" 
      >
        <CardBody>
          <form onSubmit={onNewPostSubmit}>
              <div className="flex lg:gap-0 gap-6 flex-wrap flex-col justify-between items-center">
                <Input 
                    label="Enter a title for your blog article" 
                    size="lg"
                    name='title'
                    value={newPost.title}
                    className='w-full'
                    onChange={handleChange}
                />
                <div className="mt-5 w-full">
                  <Textarea 
                    variant="outlined" 
                    placeholder="Enter your blog post here" 
                    rows={24}
                    cols={40} 
                    size='lg'
                    name='description'
                    onChange={handleChange}
                    >
                      {newPost.description}
                    </Textarea>
                  <div className="flex w-full justify-between py-1.5">
                    <IconButton variant="text" color="blue-gray" size="sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                      </svg>
                    </IconButton>
                    <div className="flex gap-2">
                      <Button size="sm" color="red" variant="text" className="rounded-md" onClick={onCancel}>
                        Cancel
                      </Button>
                      <Button size="sm" className="rounded-md" onClick={onNewPostSubmit}>
                       Submit Article
                      </Button>
                    </div>
                  </div>
                </div>
            </div>
        </form>  
        </CardBody>  
        </Card>
    </section>
    </Layout>
  );
}

export default NewBlogPage;