import UserProfile from "../components/UserProfile";

import Layout from '../components/Layout';
import BlogList from "../components/BlogList";
 
const DashboardPage = () =>{
  return (
    <Layout>
      <UserProfile />
      <BlogList />
    </Layout>
  );
}

export default DashboardPage;