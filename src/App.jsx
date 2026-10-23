import { MainPage, ComicsPage, NotFoundPage, SingleComicsPage } from './pages';
import AppHeader from './components/appHeader/AppHeader';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
