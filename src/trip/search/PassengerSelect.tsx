import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
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
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
  },
}))(MenuItem);

export default function CustomizedMenus() {
  let passengersList = [{"type": "Adult", "count": 1}, {"type": "Child", "count": 0}, {"type": "Infant", "count": 0}];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const passengers = passengersList.map((passenger, index) => (
    <StyledMenuItem key={index}>
      <ListItemText primary={passenger.type} />
      <Button>
        <RemoveIcon fontSize="small" />
      </Button>
      <span className="passenger-count">{passenger.count}</span>
      <Button>
        <AddIcon fontSize="small" />
      </Button>         
    </StyledMenuItem>
  ));
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="default"
        onClick={handleClick}
      >
        <PersonAddOutlinedIcon />
        Passengers
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {passengers}
      </StyledMenu>
    </div>
  );
}
