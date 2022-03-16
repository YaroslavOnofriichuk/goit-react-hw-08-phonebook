import { useDeleteContactMutation } from '../../redux/contactsApi';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const ContactListItem = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = id => {
    deleteContact(id);
  };

  return (
    <ListItem disablePadding key={contact.id}>
      <ListItemButton>
        <ListItemText primary={`${contact.name}: ${contact.phone}`} />
        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            type="button"
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </Button>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object,
};
