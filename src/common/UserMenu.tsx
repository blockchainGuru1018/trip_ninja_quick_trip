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

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
          {parseUserInitials("Rob")}
        </UserAvatar>
      </ListItemAvatar>
      <ListItemText primary="Rob Dumont" secondary="rob.dumont@tripninja.io" />
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
          {parseUserInitials("Rob")}
        </UserAvatar>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
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
        <LogoutMenuItem onClick={handleClose}>Sign out</LogoutMenuItem>
      </Menu>
    </div>
  );
}

const parseUserInitials = (user: string) => {
  // TODO Pass user object and get user.firstname and user.lastname
  return user.charAt(0)+user.charAt(0);
}