import './randomChar.scss';
import notFoundChar from '../../resources/img/image_not_available.jpg';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';

import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const { loading, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateRandomChar();
  }, []);

  async function updateRandomChar() {
    clearError();
    const id = Math.floor(Math.random() * (21 - 1) + 1);

    const res = await getCharacter(id);
    setChar(res);
  }

  return (
    <div className="randomchar">
      {loading ? <Spinner /> : <View char={char} />}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateRandomChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  if (!char) {
    return (
      <div className="randomchar__block">
        <img src={notFoundChar} alt="Not found" className="randomchar__img" />
        <div className="randomchar__info">
          <p className="randomchar__name">Random Character</p>
          <p className="randomchar__descr">Description not found</p>
          <div className="randomchar__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description.length > 120 ? description.slice(0, 120) + '...' : description || 'Description not found'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
