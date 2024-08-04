import { Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { init } from './features/phonesSlice';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
