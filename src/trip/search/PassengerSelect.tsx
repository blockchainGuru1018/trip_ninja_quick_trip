import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ListItemText from '@material-ui/core/ListItemText';
import { Passenger } from './SearchInterfaces';
import { updatePassengers } from '../../actions/SearchActions';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    height: '56px',
    textTransform: 'none',
    justifyContent: 'left',
    fontFamily: 'NeuzeitGro-Reg',
    '&:hover': {
      borderColor: '#CACDD6',
      borderBottom: 'solid 3px #0DBE7CEB',
      backgroundColor: '#fff'
    }
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

interface PassengerSelectProps {
  passengers: Array<Passenger>
  updatePassengers: typeof updatePassengers
}

const PassengerSelect = (props: PassengerSelectProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | any>(null);
  const [t, i18n] = useTranslation('common');

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const passengerMenu = props.passengers.map((passenger, index) => (
    <MenuItem key={index}>
      <ListItemText primary={t('commonWords.passengerTypes.'+passenger.code)}/>
      <IconButton onClick={() =>
        props.updatePassengers(passenger.type, -1)
      }>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <span className="passenger-count">{passenger.count}</span>
      <IconButton onClick={() =>
        props.updatePassengers(passenger.type, 1)
      }>
        <AddIcon fontSize="small" />
      </IconButton>
    </MenuItem>
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
        <PersonAddOutlinedIcon color="primary" className="passengers-icon"/>
        {t('commonWords.passengers')}
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
};

export default PassengerSelect;

