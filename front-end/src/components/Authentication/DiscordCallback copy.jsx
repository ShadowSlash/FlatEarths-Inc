import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiscordCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the authorization code from the URL query parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code'); // Get the 'code' parameter from the URL
    
        if (code) {
          // Send the authorization code to your backend to exchange it for an access token
          fetch('http://127.0.0.1:8000/account/discord/api/v1/callback', {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status) {
                // Store the Discord token in localStorage
                localStorage.setItem('discordAuthToken', data.token);
                navigate('/dashboard'); // Redirect the user to the dashboard
              } else {
                console.error('Error handling Discord login');
                navigate('/login'); // If there's an error, redirect to the login page
              }
            })
            .catch((error) => {
              console.error('Error during Discord authentication:', error);
              navigate('/login'); // Redirect to login if there's a failure
            });
        } else {
          console.error('No authorization code in URL');
          navigate('/login'); // If no code, redirect to the login page
        }
      }, [navigate]);
    
      return <div>Loading...</div>; // Show a loading screen while the code is being exchanged
    };
    

    export default DiscordCallbackPage;

