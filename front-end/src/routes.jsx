import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import NewBlog from './pages/NewBlog';
import BlogDetail from './pages/BlogDetail';
import DiscordCallback from './components/Authentication/DiscordCallback';
import SearchPage from './pages/SearchPage';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/discordCallback" element={<DiscordCallback />}/>
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
