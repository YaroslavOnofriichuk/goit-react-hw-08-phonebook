import { useDeleteContactMutation } from '../../redux/contacts/contactsApi';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';

export const ContactListItem = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDelete = id => {
    deleteContact(id);
  };

  const handleClick = id => {
    if (pathname.includes('contacts')) {
      navigate(id);
    } else {
      navigate(`contacts/${id}`);
    }
  };

  return (
    <ListItem disablePadding key={contact.id}>
      <ListItemButton>
        <ListItemText
          primary={`${contact.name}: ${contact.number}`}
          onClick={() => handleClick(contact.id)}
        />
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
