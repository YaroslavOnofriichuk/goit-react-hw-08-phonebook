import {
  useUpdateContactMutation,
  useGetContactsQuery,
} from '../../redux/contacts/contactsApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { setIsLoading } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';

export const ContactPage = () => {
  const [updateContact] = useUpdateContactMutation();
  const { data, isFetching } = useGetContactsQuery();
  const { contactId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: false,
    number: false,
  });
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    dispatch(setIsLoading(isFetching));

    if (data) {
      setContacts(data);
      setContact(data.find(contact => contact.id === contactId));
    }
  }, [contactId, data, dispatch, isFetching]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const newContact = {
      id: contactId,
      name: newName,
      number: newNumber,
    };

    if (
      contacts.find(
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
      updateContact(newContact);
      setContact(newContact);
      navigate('/contacts');
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
    <Box sx={{ maxWidth: '600px', padding: '20px', margin: 'auto' }}>
      <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Typography variant="h5" component="h2" sx={{ ml: '7px' }}>
            Change contact
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
            {contact.name && (
              <TextField
                required
                error={Boolean(errors?.name)}
                id="outlined-basic-name"
                label="Name"
                defaultValue={contact.name}
                variant="outlined"
                onChange={handleChange}
                name="name"
              />
            )}
            {contact.name && (
              <TextField
                required
                error={Boolean(errors?.number)}
                id="outlined-basic-number"
                label="Number"
                defaultValue={contact.number}
                variant="outlined"
                onChange={handleChange}
                name="number"
              />
            )}

            <Stack spacing={2} alignItems="center">
              <Button
                variant="contained"
                type="submit"
                disabled={Boolean(errors?.name) || Boolean(errors?.number)}
              >
                Update contact
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
