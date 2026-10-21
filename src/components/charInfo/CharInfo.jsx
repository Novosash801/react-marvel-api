import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    clearError();
    if (charId) {
      getCharacterInfo(charId);
    }
  }, [charId]);

  async function getCharacterInfo(id) {
    if (!id) {
      return;
    }

    const charInfo = await getCharacter(id);
    setChar(charInfo);
  }

  const skeleton = char || loading || error ? null : <Skeleton />;

  if (!char) {
    return <div className="char__info">{skeleton}</div>;
  }

  const { id, name, description, thumbnail, homepage, wiki, comics } = char;
  let imgNoneStyle = { objectFit: 'cover' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgNoneStyle = { objectFit: 'contain' };
  }

  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgNoneStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item) => {
          return <li className="char__comics-item">{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default CharInfo;
