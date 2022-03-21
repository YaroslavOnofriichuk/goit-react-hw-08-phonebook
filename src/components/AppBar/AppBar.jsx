import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { UserMenu } from '../UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = page => {
    setAnchorElNav(null);
    navigate(page);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            PHONE BOOK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => handleCloseNavMenu('contacts')}>
                <Typography textAlign="center">contacts</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu('login')}>
                <Typography textAlign="center">login</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu('register')}>
                <Typography textAlign="center">register</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            PHONE BOOK
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => handleCloseNavMenu('contacts')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              contacts
            </Button>
            <Button
              onClick={() => handleCloseNavMenu('login')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              login
            </Button>
            <Button
              onClick={() => handleCloseNavMenu('register')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              register
            </Button>
          </Box>

          <ThemeSwitch />

          {user && <UserMenu />}
        </Toolbar>
      </Container>
      {/* <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> */}
    </AppBar>
  );
};
