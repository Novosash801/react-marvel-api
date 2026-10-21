import './charList.scss';
import { useCallback, useEffect, useState, useId } from 'react';
import ErrorMessage from '../ErrorImg/ErrorImg';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const id = useId();

  const marvelService = useMarvelService();

  const onCharListLoaded = useCallback((newCharList) => {
    setCharList((prevCharList) => [...prevCharList, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((currentOffset) => currentOffset + 9);
    setCharEnded(newCharList.length < 9);
  }, []);

  // useEffect(() => {
  //   let cancelled = false;

  //   marvelService
  //     .getAllCharacters()
  //     .then((characters) => {
  //       if (!cancelled) onCharListLoaded(characters);
  //     })
  //     .catch((requestError) => {
  //       if (cancelled) return;
  //       setError(requestError instanceof Error ? requestError.message : 'Неизвестная ошибка');
  //       setLoading(false);
  //     });

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [onCharListLoaded]);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    setError('');
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Неизвестная ошибка');
        setNewItemLoading(false);
      });
  };

  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          className={`char__item${selectedCharacterId === item.id ? ' char__item_selected' : ''}`}
          tabIndex={0}
          key={id}
          onClick={(e) => {
            console.log('item', item);
            onCharSelected(item.id);
            setSelectedCharacterId(item.id);
            e.currentTarget.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              onCharSelected(item.id);
              setSelectedCharacterId(item.id);
              e.currentTarget.focus();
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const errorMessage = error ? (
    <>
      <ErrorMessage />
      <p role="alert">Не удалось загрузить персонажей: {error}</p>
    </>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
