import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import NewBlog from './pages/NewBlog';
import BlogDetail from './pages/BlogDetail';
import DiscordCallbackPage from './components/Authentication/DiscordCallback';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/discordcallback" element={<DiscordCallbackPage />} />

    </Routes>
  </Router>
);

export default AppRoutes;
