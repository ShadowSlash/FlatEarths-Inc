import React, { useState, useEffect } from 'react';
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
import Navbar from '../components/Navigation';
import { useUser } from '../contexts/UserContext';

const LoginPage = () => {
  const { loginUser } = useUser();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  //------------------------Alternate login using discord. ------------------------------------------------------------------//
  const redirectToDiscord = () => {
    const discord_url = 'http://127.0.0.1:8000/account/discord/login'; // URL to backend OAuth2 Discord login
    window.location.href = discord_url; // Directly redirect to Discord login
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/account/login', {
        username: userName,
        password: password,
      });

      if (response.data.status) {
        // Login the User to their Session using Context API
        loginUser(userName, password);

        // Save the JWT Token to Local Storage
        localStorage.setItem('authToken', response.data.data.token);

        // Assuming the backend sends back the user info (including avatar)
        setLoggedInUser(response.data.data.username);
        setAvatar(response.data.data.avatar);

        setLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  // If user arrives via Discord OAuth callback, capture their data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // Get the 'code' parameter from the URL

    if (code) {
      setLoading(true);
      // Send the authorization code to backend to exchange it for user data
      api
        .post('http://127.0.0.1:8000/account/discord/api/v1/callback', { code })
        .then((response) => {
          if (response.data.status === 'success') {
            // Set user data from Discord callback
            setLoggedInUser(response.data.data.username);
            setAvatar(response.data.data.avatar);
            localStorage.setItem('discordAuthToken', response.data.data.token);

            loginUser(response.data.data.username, response.data.data.token);
            setLoading(false);
            navigate('/dashboard');
          } else {
            setError('Error during Discord login');
            setLoading(false);
          }
        })
        .catch((error) => {
          setError('Error during Discord login');
          setLoading(false);
        });
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <section className="grid text-center h-screen items-center p-8 justify-center" 
      style={{
        backgroundImage: 'url(/src/assets/nasa-8Hjx3GNZYeA-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
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
            <Button variant="gradient" fullWidth onClick={onClickLogin} disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography as="a" href="/signup" variant="small" color="blue-gray" className="ml-1 font-bold">
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>

        {/* Discord Login Button */}
        <section className="mt-6">
          <Button variant="gradient" color="purple" fullWidth onClick={redirectToDiscord} disabled={loading}>
            {loading ? 'Redirecting to Discord...' : 'Login with Discord'}
          </Button>
        </section>

        {/* Display User Profile Info After Login */}
        {loggedInUser && avatar && (
          <div className="mt-6 text-center">
            <h2>Welcome, {loggedInUser}!</h2>
            <img
              src={avatar}
              alt={`${loggedInUser}'s avatar`}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default LoginPage;
