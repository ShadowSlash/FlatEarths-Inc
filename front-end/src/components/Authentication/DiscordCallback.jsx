import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from "../../contexts/UserContext";  // Corrected import

const DiscordCallback = () => {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState('');  // Store any errors

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // Get the code parameter from the URL

    if (code) {
      // Send the authorization code to your backend to exchange it for user data
      axios
        .post('http://127.0.0.1:8000/account/discord/api/v1/callback', { code })
        .then((response) => {
          if (response.data.status === 'success') {
            // Store user data from Discord in context
            loginUser({
              username: response.data.data.username,
              avatar: response.data.data.avatar,  // Discord avatar
              email: response.data.data.email || '',  // Discord email (if available)
            });

            localStorage.setItem('discordAuthToken', response.data.data.token);  // Save token
            navigate('/dashboard');  // Redirect to dashboard
          } else {
            setError('Error during Discord login');  // Set error message
            console.error('Error during Discord login');
            setLoading(false);  // Stop loading state
            navigate('/login');  // Redirect to login page
          }
        })
        .catch((error) => {
          setError('Error during Discord login. Please try again.');  // Show error message
          console.error('Error during Discord login:', error);
          setLoading(false);  // Stop loading state
          navigate('/login');  // Redirect to login page
        });
    } else {
      setError('No authorization code found.');  // Handle missing code scenario
      setLoading(false);  // Stop loading state
      navigate('/login');  // Redirect to login page
    }
  }, [navigate, loginUser]);

  // If still loading, show a loading spinner or text
  if (loading) {
    return <div>Loading...</div>;  // Could be replaced with a spinner for a better UX
  }

  // If there's an error, display it
  if (error) {
    return <div>{error}</div>;
  }

  return null; // No need for a return value, as redirect happens immediately
};

export default DiscordCallback;
