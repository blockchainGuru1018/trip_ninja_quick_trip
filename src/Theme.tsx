import { createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0DBE7CEB',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#45565E',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      'NeuzeitGro-Reg',
      'NeuzeitGro-Bol'
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'NeuzeitGro-Bol',
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: '2px',
        '&:focus': {
          outlineColor: '#ffffff',
        }
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '2px',
        '&:hover $notchedOutline': {
          borderColor: '#CACDD6',
          borderBottom: 'solid 3px #0DBE7CEB'
        }
      },
      adornedStart: {
        paddingLeft: '0px'
      }
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'none',
          opacity: '0.7'
        }
      }
    }
  },
});

export default Theme;