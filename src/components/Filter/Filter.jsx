import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/phoneBookSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function Filter() {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Find contacts by name"
        variant="outlined"
        type="text"
        onChange={handleChange}
      />
    </Box>
  );
}
