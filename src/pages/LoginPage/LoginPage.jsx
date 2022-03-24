import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { EmailInput } from '../../components/EmailInput/EmailInput';
import { useLoginUserMutation } from '../../redux/authApi';
import {
  setIsLoggedIn,
  setToken,
  setUser,
  setIsLoading,
} from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    setErrors({
      email: false,
      password: false,
    });

    const reg = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ).test(email);

    if (email.trim() === '') {
      setErrors(previousState => {
        return {
          ...previousState,
          email: true,
        };
      });
      toast.error('The Email field cannot be empty');
    } else if (!reg) {
      setErrors(previousState => {
        return {
          ...previousState,
          email: true,
        };
      });
      toast.error('You have entered an invalid email address!');
    } else if (password.trim() === '') {
      setErrors(previousState => {
        return {
          ...previousState,
          password: true,
        };
      });
      toast.error('The Pasword field cannot be empty');
    } else {
      try {
        const user = await loginUser({
          email,
          password,
        });

        if (user.data) {
          dispatch(setUser(user.data.user));
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(user.data.token));

          navigate('/contacts');
        } else {
          toast.error('User not logged in');
        }
      } catch (err) {
        console.log(err);
      }
    }

    form.reset();
  };

  const handleChangePassword = password => {
    setPassword(password);
  };

  const handleChangeEmail = email => {
    setEmail(email);
  };

  return (
    <Box sx={{ maxWidth: '600px', padding: '20px', margin: 'auto' }}>
      <Typography variant="h5" component="h2" sx={{ ml: '7px' }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <EmailInput
          handleChangeEmail={handleChangeEmail}
          error={Boolean(errors?.email)}
        />

        <PasswordInput
          handleChangePassword={handleChangePassword}
          error={Boolean(errors?.password)}
        />

        <Stack spacing={2} alignItems="center">
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
