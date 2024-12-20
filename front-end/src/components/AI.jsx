import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JokeGenerator = () => {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    // Function to fetch joke from the backend
    const fetchJoke = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blog/generate-joke/'); //------------------------backend api
        if (response.data.status) {
          setJoke(response.data.joke); // Set the joke
        }
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    };

    // Fetch joke when component mounts
    fetchJoke();
  }, []); // Empty dependency array means it runs once when the component is mounted

  return (
    <div>
      <h1>Random Joke</h1>
      <p>{joke}</p>
      <button onClick={() => window.location.reload()}>Get Another Joke</button>
    </div>
  );
};

export default JokeGenerator;
