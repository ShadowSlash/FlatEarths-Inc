import UserProfile from "../components/UserProfile";

import Layout from '../components/Layout';
import BlogList from "../components/BlogList";
 
const DashboardPage = () =>{
  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');
  return (
    <Layout>
       <div className="container mx-auto px-8 py-5">
          <UserProfile sername={username} avatar={avatar} />
          <BlogList />
        </div>
    </Layout>
  );
}

export default DashboardPage;