import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { NameInput } from '../../components/NameInput/NameInput';
import { EmailInput } from '../../components/EmailInput/EmailInput';
import { useRegisterUserMutation } from '../../redux/auth/authApi';
import {
  setUser,
  setToken,
  setIsLoggedIn,
  setIsLoading,
} from '../../redux/auth/authSlice';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    setErrors({
      name: false,
      email: false,
      password: false,
    });

    const reg = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ).test(email);

    if (name.trim() === '') {
      setErrors(previousState => {
        return {
          ...previousState,
          name: true,
        };
      });
      toast.error('The Name field cannot be empty');
    } else if (email.trim() === '') {
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
    } else if (password.length < 7) {
      setErrors(previousState => {
        return {
          ...previousState,
          password: true,
        };
      });
      toast.error('Password must be longer than 7 characters');
    } else {
      try {
        const user = await registerUser({
          name,
          email,
          password,
        });
        if (user.data) {
          dispatch(setUser(user.data.user));
          dispatch(setToken(user.data.token));
          dispatch(setIsLoggedIn(true));

          navigate('/contacts');
        } else {
          toast.error('User not created');
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

  const handleChangeName = name => {
    setName(name);
  };

  const handleChangeEmail = email => {
    setEmail(email);
  };

  return (
    <Box sx={{ maxWidth: '600px', padding: '20px', margin: 'auto' }}>
      <Typography variant="h5" component="h2" sx={{ ml: '7px' }}>
        Registration
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
        <NameInput
          handleChangeName={handleChangeName}
          error={Boolean(errors?.name)}
        />

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
            Create account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
