import React from 'react';
import PassengerList from '../../assets/data/passengers.json';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    height: '56px',
    textTransform: 'none',
    justifyContent: 'left'
  },
});

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onAddPassenger = () => {
    console.log("ADD");
  }
  
  const onRemovePassenger = () => {
    console.log("REMOVE");
  }
  
  const classes = useStyles();

  const passengerMenu = PassengerList.map((passenger, index) => (
    <StyledMenuItem key={index}>
      <ListItemText primary={passenger.type} />
      <IconButton onClick={onRemovePassenger}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <span className="passenger-count">{passenger.count}</span>
      <IconButton onClick={onAddPassenger}>
        <AddIcon fontSize="small" />
      </IconButton>         
    </StyledMenuItem>
  ));
  return (
    <div>
      <Button
        fullWidth
        classes={{
          root: classes.root
        }}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="default"
        size="large"
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
        {passengerMenu}
      </StyledMenu>
    </div>
  );
}


