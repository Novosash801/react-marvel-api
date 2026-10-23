import './singleComic.scss';
import { useParams } from 'react-router';

import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router';
import ErrorImg from '../errorImg/ErrorImg';
import Spinner from '../spinner/Spinner';

const SingleComic = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    async function getComicInfo() {
      clearError();

      if (!comicId) {
        return;
      }

      const comicInfo = await getComics(comicId);
      setComic(comicInfo);
    }

    if (comicId) {
      getComicInfo();
    }
  }, [comicId, clearError, getComics]);

  const errorMessage = error ? (
    <>
      <ErrorImg />
      <p role="alert">Не удалось загрузить комикс: {error}</p>
    </>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = comic && !(loading || error) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {content}
      {spinner}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to={'/comics'} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
