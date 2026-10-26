import AppHeader from './components/appHeader/AppHeader';
import Spinner from './components/spinner/Spinner';
import { BrowserRouter, Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const ComicsPage = lazy(() => import('./pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('./pages/SingleComicsPage'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
