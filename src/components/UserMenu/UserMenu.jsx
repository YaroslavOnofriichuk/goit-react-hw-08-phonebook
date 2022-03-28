import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { toast } from 'react-hot-toast';
import { useLogOutUserMutation } from '../../redux/auth/authApi';
import {
  setUser,
  setToken,
  setIsLoggedIn,
  setIsLoading,
} from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logOut, { isLoading }] = useLogOutUserMutation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state => state.auth?.user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogOut = async () => {
    setAnchorElUser(null);

    try {
      const user = await logOut(token);

      if (user.data) {
        dispatch(setUser({}));
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));

        navigate('login');
      } else {
        toast.error('User not logged out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{email}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClickLogOut}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
