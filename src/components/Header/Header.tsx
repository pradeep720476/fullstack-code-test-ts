import { DarkMode, LightMode } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';

interface HeaderProps {
  title: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, darkMode, title }) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleDarkMode}
          sx={{ position: 'absolute', right: '16px' }}
        >
          {darkMode ? <LightMode name="Light" /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
