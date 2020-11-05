import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { currencySymbol } from '../../../helpers/CurrencySymbolHelper';
import { useTranslation } from 'react-i18next';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'var(--secondary)',
    width: '250px',
    height: '75px',
    padding: '20px;',
    fontFamily: 'NeuzeitGro-Reg',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    boxShadow: '0px 3px 6px #00000029',
  },
}))(Tooltip);

interface PriceBreakdownTooltipProps {
  totalPrice: number;
  markup: number;
  currency: string;
}

export default function PriceBreakdownTooltip(props: PriceBreakdownTooltipProps) {
  const [ t ] = useTranslation('common');

  return (
    <HtmlTooltip
      placement="top"
      title={
        <React.Fragment>
          <div>
            <div className="row">
              <div className="col">
                <p className='standard-text'>
                  <span className="float-left">{t("results.fareSelect.price")}:</span>
                  <span className="float-right">{currencySymbol(props.currency)}{props.totalPrice.toFixed()}</span> 
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className='standard-text'>
                  <span className="float-left">Markup:</span>
                  <span className="float-right">{currencySymbol(props.currency)}{props.markup.toFixed()}</span> 
                </p>
              </div>
            </div>
            
          </div>
        </React.Fragment>
      }
    >
      <ErrorOutlineIcon className="price-breakdown-icon" color='secondary' fontSize="small"/>
    </HtmlTooltip>
  );
}
