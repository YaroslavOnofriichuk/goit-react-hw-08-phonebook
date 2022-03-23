import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/authSlice';
import { toast } from 'react-hot-toast';

export function ContactForm() {
  const [addCcontact] = useAddContactMutation();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetContactsQuery();
  const [errors, setErrors] = useState({
    name: false,
    number: false,
  });

  useEffect(() => {
    dispatch(setIsLoading(isFetching));
  }, [dispatch, isFetching]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const newContact = {
      name: newName,
      number: newNumber,
    };

    if (
      data.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.error(`${newContact.name} is already in contacts`);
    } else if (
      newContact.name.trim() === '' ||
      newContact.number.trim() === ''
    ) {
      toast.error(`The field cannot be empty`);
    } else {
      addCcontact(newContact);
    }

    form.reset();
  };

  const handleChange = e => {
    const value = e.target.value;
    const field = e.target.name;
    if (field === 'name') {
      setErrors(previousState => {
        return { ...previousState, name: false };
      });

      const reg = new RegExp(
        "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      ).test(value);

      if (!reg) {
        setErrors(previousState => {
          return {
            ...previousState,
            name: true,
          };
        });
        toast.error(
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          {
            id: 'name',
          }
        );
      }
    } else if (field === 'number') {
      setErrors(previousState => {
        return { ...previousState, number: false };
      });

      const reg = new RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      ).test(value);

      if (!reg) {
        setErrors(previousState => {
          return {
            ...previousState,
            number: true,
          };
        });
        toast.error(
          'Phone number must be digits and can contain spaces, dashes, parentheses',
          {
            id: 'number',
          }
        );
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        error={Boolean(errors?.name)}
        id="outlined-basic-name"
        label="Name"
        variant="outlined"
        onChange={handleChange}
        name="name"
      />
      <TextField
        required
        error={Boolean(errors?.number)}
        id="outlined-basic-number"
        label="Number"
        variant="outlined"
        onChange={handleChange}
        name="number"
      />

      <Stack spacing={2} alignItems="center">
        <Button
          variant="contained"
          type="submit"
          disabled={Boolean(errors?.name) || Boolean(errors?.number)}
        >
          Add contact
        </Button>
      </Stack>
    </Box>
  );
}
