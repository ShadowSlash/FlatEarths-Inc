import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { styled, alpha } from '@mui/material/styles'
import Navbar from '../components/Navigation';


import { useUser } from '../contexts/UserContext';
import axios from 'axios';


const LoginPage = () => {

  const { loginUser } = useUser();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  //------------------------Alternate login using discord. ------------------------------------------------------------------//
  const redirectToDiscord = () => {
    const discord_url = 'http://127.0.0.1:8000/account/discord/login';   // URL to backend OAuth2 Discord login
    window.location.href = discord_url;  // Directly redirect to Discord login
  };

  
  const onClickLogin = async (e) => {

    e.preventDefault();
    try {
      const response = await api.post('/account/login', {
        "username": userName,
        "password": password
      });

      if (response.data.status) {

        // Login the User to their Session using Context API
        loginUser(userName, password);

        console.log(response.data, 'Login clicked');
        // Save the JWT Token to Local Storage
        localStorage.setItem('authToken', response.data.data.token);

        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }

    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <Navbar />  {/*<<<------------This adds navbar to the login page*/}
      <section className="grid text-center h-screen items-center p-8 justify-center mt-20">  {/* Added margin-top to make space for fixed navbar */}
        <Card className="w-96">
          <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">Log In</Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="User Name" size="lg" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input label="Password" size="lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <Typography color="red" className="mt-2">{error}</Typography>}
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={onClickLogin}>Log In</Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography as="a" href="/signup" variant="small" color="blue-gray" className="ml-1 font-bold">
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
         {/* -----------------------------Discord Login Button ----------------------------------------------------*/}
         <section className="mt-6">
          <Button variant="gradient" color="purple" fullWidth onClick={redirectToDiscord}>
            Login with Discord
          </Button>
        </section>

      </section>
    </>
  );
};


export default LoginPage;
