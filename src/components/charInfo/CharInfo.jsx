import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  const getCharacterInfo = async (id) => {
    if (!id) {
      return;
    }

    const charInfo = await getCharacter(id);
    setChar(charInfo);
  };

  useEffect(() => {
    if (charId) {
      getCharacterInfo(charId);
    }
  }, [charId]);

  if (!char) {
    return (
      <div className="char__info">
        <Skeleton />
      </div>
    );
  }

  const { id, name, description, thumbnail, homepage, wiki } = char;
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
        <li className="char__comics-item">All-Winners Squad: Band of Heroes (2011) #3</li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)</li>
        <li className="char__comics-item">Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)</li>
        <li className="char__comics-item">Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)</li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li>
      </ul>
    </div>
  );
};

export default CharInfo;
