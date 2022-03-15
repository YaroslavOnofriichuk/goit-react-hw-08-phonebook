import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ContactsPage = () => {
  return (
    <>
      <Box sx={{ width: '100%', padding: '20px' }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs="auto">
            <p>Phonebook</p>
            <ContactForm />
          </Grid>
          <Grid item xs="auto">
            <p>Contacts</p>
            <Filter />
            <ContactList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
