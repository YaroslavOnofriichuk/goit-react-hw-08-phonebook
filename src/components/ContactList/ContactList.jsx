import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { useGetContactsQuery } from '../../redux/contactsApi';

export function ContactList() {
  const filter = useSelector(state => state.filter.filter);
  const { data } = useGetContactsQuery();

  const filterContact = () => {
    try {
      return data.filter(contact => {
        return contact.name.toLowerCase().includes(filter);
      });
    } catch {
      return false;
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {filterContact() &&
              filterContact().map(contact => (
                <ContactListItem key={contact.id} contact={contact} />
              ))}
          </List>
        </nav>
      </Box>
    </>
  );
}
