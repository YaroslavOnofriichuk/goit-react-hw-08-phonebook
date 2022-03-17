import TextField from '@mui/material/TextField';

export const NameInput = ({ handleChangeName, error }) => {
  const handleChange = e => {
    const name = e.target.value;

    handleChangeName(name);
  };

  return (
    <TextField
      required
      error={error}
      id="outlined-basic-name"
      label="Name"
      variant="outlined"
      name="name"
      onChange={handleChange}
    />
  );
};
