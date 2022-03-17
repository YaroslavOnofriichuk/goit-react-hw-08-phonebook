import TextField from '@mui/material/TextField';

export const EmailInput = ({ handleChangeEmail, error }) => {
  const handleChange = e => {
    const email = e.target.value;

    handleChangeEmail(email);
  };

  return (
    <TextField
      required
      error={error}
      id="outlined-basic-email"
      label="Email"
      variant="outlined"
      name="email"
      onChange={handleChange}
    />
  );
};
