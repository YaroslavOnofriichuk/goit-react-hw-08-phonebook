import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { useGetContactsQuery } from '../../redux/contactsApi';
import { setIsLoading } from '../../redux/authSlice';

export function ContactList() {
  const filter = useSelector(state => state.filter.filter);
  const { data, isFetching } = useGetContactsQuery();
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(isFetching));

    if (data) {
      setContacts(data);
    }
  }, [data, dispatch, isFetching]);

  const filterContact = () => {
    try {
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter);
      });
    } catch {
      return false;
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.default', ml: '7px' }}>
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
