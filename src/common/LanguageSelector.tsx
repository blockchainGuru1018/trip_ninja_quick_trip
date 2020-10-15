import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '../i18n';
import { CircleFlag } from 'react-circle-flags';
import { countryLocaleMap } from '../localeMap';


export default function LanguageSelector() {

  const getCountryCode = (code: string) => {
    const languageObject = countryLocaleMap.find((language: any) => language.languageCode === code);
    return languageObject ? languageObject.countryCode : "gb";
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<string>(i18n.language);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageSelection = (value: string) => {
    setAnchorEl(null);
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  const handleClose = (value: string) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <CircleFlag countryCode={getCountryCode(language)} height="38" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {countryLocaleMap.map((locale, index) => (
          <MenuItem 
            key={index.toString()}
            value={locale.languageCode}
            onClick={(event) => handleLanguageSelection(locale.languageCode)}
          >
            <CircleFlag countryCode={locale.countryCode} height="38" />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
