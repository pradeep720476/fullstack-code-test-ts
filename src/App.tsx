import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import UsersPage from './pages/UsersPage';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import { useState } from 'react';
import UserDetail from './pages/UserDetailPage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage />}></Route>
          <Route
            path="/users"
            element={
              <Box>
                <Header
                  title="Users"
                  toggleDarkMode={toggleMode}
                  darkMode={darkMode}
                />
                <UsersPage />
              </Box>
            }
          ></Route>
          <Route
            path="/users/:id"
            element={
              <Box>
                <Header
                  title=""
                  toggleDarkMode={toggleMode}
                  darkMode={darkMode}
                />
                <UserDetail />
              </Box>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
