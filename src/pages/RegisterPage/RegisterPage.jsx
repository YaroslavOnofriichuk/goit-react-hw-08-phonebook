import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';

export const RegisterPage = () => {
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
        // onSubmit={handleSubmit}
      >
        <TextField
          required
          // error={Boolean(errors?.name)}
          id="outlined-basic-name"
          label="Name"
          variant="outlined"
          // onChange={handleChange}
          name="name"
        />
        <TextField
          required
          // error={Boolean(errors?.name)}
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          // onChange={handleChange}
          name="email"
        />

        <PasswordInput />

        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            type="submit"
            // disabled={Boolean(errors?.name) || Boolean(errors?.number)}
          >
            Create account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
