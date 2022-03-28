import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { setTheme } from '../../redux/theme/themeSlice';
import { useSelector, useDispatch } from 'react-redux';

export const ThemeSwitch = () => {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setTheme());
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={handleChange} aria-label="theme switch" />}
        label={theme ? 'Light' : 'Dark'}
      />
    </FormGroup>
  );
};
