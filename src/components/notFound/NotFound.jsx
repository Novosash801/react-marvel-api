import { Link } from 'react-router';
import ErrorImg from '../errorImg/ErrorImg';
import './notFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <ErrorImg />
      <h1 className="not-found__text">Page is not found</h1>
      <Link to={'/'}>
        <button className="not-found__button">
          <p className="not-found__button-text">Go back to main page</p>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
