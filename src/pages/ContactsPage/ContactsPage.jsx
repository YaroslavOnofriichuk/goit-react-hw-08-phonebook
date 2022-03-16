import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ContactsPage = () => {
  return (
    <>
      <Box sx={{ maxWidth: '600px', padding: '20px', margin: 'auto' }}>
        <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item>
            <Typography variant="h5" component="h2" sx={{ ml: '7px' }}>
              Phonebook
            </Typography>
            <ContactForm />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2" sx={{ ml: '7px' }}>
              Contacts
            </Typography>
            <Filter />
            <ContactList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
