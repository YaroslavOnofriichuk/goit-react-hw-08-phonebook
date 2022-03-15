import { nanoid } from 'nanoid';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';

export function ContactForm() {
  const [addCcontact] = useAddContactMutation();
  const { data } = useGetContactsQuery();
  const [errors, setIerrors] = useState({
    name: false,
    number: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const newContact = {
      name: newName,
      phone: newNumber,
    };

    if (
      data.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`${newContact.name} is already in contacts`);
    } else if (
      newContact.name.trim() === '' ||
      newContact.phone.trim() === ''
    ) {
      window.alert(`is already in contacts`);
    } else {
      addCcontact(newContact);
    }

    form.reset();
  };

  const handleChange = e => {
    const value = e.target.value;
    const field = e.target.name;
    if (field === 'name') {
      setIerrors(previousState => {
        return { ...previousState, name: false };
      });

      const reg = new RegExp(
        "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      ).test(value);

      if (!reg) {
        setIerrors(previousState => {
          return {
            ...previousState,
            name: true,
          };
        });
      }
    } else if (field === 'number') {
      setIerrors(previousState => {
        return { ...previousState, number: false };
      });

      const reg = new RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      ).test(value);

      if (!reg) {
        setIerrors(previousState => {
          return {
            ...previousState,
            number: true,
          };
        });
      }
    }
  };

  const formId = nanoid();

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        htmlFor={formId}
      >
        <TextField
          required
          error={Boolean(errors?.name)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={handleChange}
          name="name"
          // helperText={errors?.name}
        />
        <TextField
          required
          error={Boolean(errors?.number)}
          id="outlined-basic"
          label="Number"
          variant="outlined"
          onChange={handleChange}
          name="number"
          // helperText={errors?.number}
        />

        <Stack spacing={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={Boolean(errors?.name) || Boolean(errors?.number)}
          >
            Add contact
          </Button>
        </Stack>
      </Box>
    </>
  );
}
