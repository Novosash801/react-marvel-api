import AppHeader from './components/appHeader/AppHeader';
import RandomChar from './components/randomChar/RandomChar';
import CharList from './components/charList/CharList';
import CharInfo from './components/charInfo/CharInfo';

import decoration from './resources/img/vision.png';
import { useState } from 'react';

const App = () => {
  const [activeChar, setActiveChar] = useState(null);

  const onCharSelected = (id) => {
    setActiveChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onCharSelected={onCharSelected} />
          {/* <CharInfo charId={activeChar} /> */}
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
