import { Link } from 'react-router';
import ErrorImg from '../components/ErrorImg/ErrorImg';

const NotfoundPage = () => {
  return (
    <div>
      <ErrorImg />
      <p>Page is not found</p>
      <Link to={'/'}>Go back to main page</Link>
    </div>
  );
};

export default NotfoundPage;
