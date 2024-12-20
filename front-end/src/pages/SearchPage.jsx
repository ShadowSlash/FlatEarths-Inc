import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Navbar from '../components/Navigation';

import backgroundImage from '../assets/spacex-VBNb52J8Trk-unsplash.jpg';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || ""; // Default to empty string if no query
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      console.log(`Searching for: ${query}`);
      setLoading(true);
      // Fetch search results based on query here
      api.get(`/search?q=${query}`)
        .then((response) => {
          setResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setError('Failed to fetch search results. Please try again.');
          setLoading(false);
        });
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <section className="grid text-center h-screen items-center p-8 justify-center mt-0" 
      style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <Card className="w-96">
          <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">Search</Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Search Query"
              size="lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {error && <Typography color="red" className="mt-2">{error}</Typography>}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </CardFooter>
        </Card>

        {/* Display results if there are any.*/}
        {loading ? (
          <Typography variant="h6" className="mt-4">Loading...</Typography>
        ) : (
          <div className="mt-6">
            {results.length > 0 ? (
              results.map((result) => (
                <Card key={result.id} className="mb-4">
                  <CardHeader>
                    <Typography variant="h6">{result.title}</Typography>
                  </CardHeader>
                  <CardBody>
                    <Typography>{result.description}</Typography>
                  </CardBody>
                  <CardFooter>
                    <Button variant="gradient">View More</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Typography ></Typography>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchPage;
