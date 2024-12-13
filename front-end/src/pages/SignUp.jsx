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

import { useUser } from '../contexts/UserContext';
import Navbar from '../components/Navbar';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const onClickSignUp = async (e) => {
    e.preventDefault();
    try {

      const signUpRes = await api.post('/account/signup', {
        "username": userName,
        "email": email,
        "password": password,
        "password2": password,
      });

    
      if (signUpRes.data.status) {
        const loginRes = await api.post('/account/login', {
          "username": userName,
          "password": password
        });

        if (loginRes.data.status) {

          // Login the User to their Session using Context API
          loginUser(userName, email, password);

          // Save the JWT Token to Local Storage
          localStorage.setItem('authToken', loginRes.data.data.token);

          console.log('User signed up and logged in:', userName);
          navigate('/dashboard');
        }
      } else {
        setError('Could not sign up. Please try again.');
      }


    } catch (err) {
      setError('Invalid account details. Please try again.');
    }
  };

  return (
    <>
      <Navbar />  {/* Navbar */}

      <section className="grid text-center h-screen items-center p-10 justify-center mt-20">  
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input 
              label="Username" 
              size="lg"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
            />
            <Input 
              label="Email" 
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              label="Password" 
              size="lg" 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={onClickSignUp} fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};


export default SignUpPage;
