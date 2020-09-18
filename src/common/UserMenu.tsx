import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { styled } from '@material-ui/core/styles';
import { logout } from '../actions/AuthActions';
import { AuthDetails } from '../auth/AuthInterfaces';
import { useTranslation } from 'react-i18next';

interface UserMenuProps {
  logout: typeof logout
  authDetails: AuthDetails
}

export default function UserMenu(props: UserMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ t ] = useTranslation('common');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserAvatar = styled(Avatar)({
    backgroundColor: '#ffffff',
    color: '#45565E',
    border: 'solid 2px #45565E'
  });

  const LogoutMenuItem = styled(MenuItem)({
    float: 'right',
    color: '#4BAFD7'
  });

  const userDetails =
    <MenuItem>
      <ListItemAvatar>
        <UserAvatar>
          {parseUserInitials(props.authDetails.userFirstName, props.authDetails.userLastName)}
        </UserAvatar>
      </ListItemAvatar>
      <ListItemText 
        primary={props.authDetails.userFirstName + ' ' + props.authDetails.userLastName} 
        secondary={props.authDetails.userEmail} />
    </MenuItem>

  return (
    <div>
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        size="large"
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}>
        <UserAvatar>
          {parseUserInitials(props.authDetails.userFirstName, props.authDetails.userLastName)}
        </UserAvatar>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {userDetails}
        <Divider variant="middle" />
        <LogoutMenuItem onClick={() => {props.logout()}}>{t('common.userMenu.signOut')}</LogoutMenuItem>
      </Menu>
    </div>
  );
}

const parseUserInitials = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return firstName.charAt(0)+lastName.charAt(0);
  } else {
    return "TN";
  }
  
}