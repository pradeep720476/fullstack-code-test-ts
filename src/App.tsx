import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingPage from './pages/LoadingPage';
import UsersPage from './pages/UsersPage';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage />}></Route>
          <Route path="/users" element={<UsersPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
