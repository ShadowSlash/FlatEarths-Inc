import Navigation from "./Navigation";
import Footer from "./Footer";
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {

	const { user } = useUser();
	const navigate = useNavigate();

	if (!user.isLoggedIn) {
		navigate('/login');
	}

	return (
		<div>
			<Navigation />
			{children}
			<Footer />
		</div>
	);
}

export default Layout;