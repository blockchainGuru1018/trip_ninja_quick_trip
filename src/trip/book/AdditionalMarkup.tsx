import {useTranslation} from "react-i18next";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {updateAdditionalMarkup} from '../../actions/PricingActions';
import Button from '@material-ui/core/Button';
import {formatPrice} from "../../helpers/CurrencySymbolHelper";
import EditIcon from '@material-ui/icons/Edit';
import {styled} from "@material-ui/core/styles";
import {Alert} from "@material-ui/lab";


interface AdditionalMarkupProps {
    additionalMarkup: number;
    currency: string;
    additionalMarkupDisplay?: boolean;
    updateAdditionalMarkup: typeof updateAdditionalMarkup
    pricingDisplay?: boolean
}

const AdditionalMarkupButton = styled(Button)({
  color: 'var(--tertiary)',
  paddingLeft: '0px',
  '&:hover': {
    backgroundColor: '#ffffff',
    opacity: '0.7'
  }
});

export default function AdditionalMarkup(props: AdditionalMarkupProps) {
  const [ t ] = useTranslation('common');
  let initialState: string;
  if(props.pricingDisplay) {
    initialState = props.additionalMarkup > 0 ? 'set' : 'not-set';
  } else {
    initialState = props.additionalMarkup > 0 ? 'final' : 'hide';
  }
  const [addMarkupView, setAddMarkupView] = React.useState<string>(initialState);/*'not-set', 'editing', 'set', 'final'*/
  const [negativeMarkup, setNegativeMarkup] = React.useState<boolean>(false);
  const handleMarkupIsSet = () => {
    const value: string = props.additionalMarkup === 0 ? 'not-set' : 'set';
    setAddMarkupView(value);
  };
  const validateMarkup = (markup: number) => {
    if(markup < 0) {
      setNegativeMarkup(true);
      props.updateAdditionalMarkup(0);
    } else {
      setNegativeMarkup(false);
      props.updateAdditionalMarkup(markup);
    }
  };


  function getComponent(){
    switch(addMarkupView){
      case 'not-set':
        return <AdditionalMarkupButton onClick={() => setAddMarkupView('editing')}>+ {t("common.fareBreakdown.additionalMarkup")}</AdditionalMarkupButton>;
      case 'editing':
        return <div className="row additional-markup-input-row">
          <div className="col-sm-9 fare-breakdown-text my-auto">
            <p className="standard-text">{t("common.fareBreakdown.additionalMarkup")}</p>
          </div>
          <div className="col-sm-3 fare-breakdown-price">
            {props.additionalMarkupDisplay &&
                <TextField
                  id="additional-markup"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={props.additionalMarkup === 0 ? '' : props.additionalMarkup}
                  onChange={(event: any) => validateMarkup(event.target.value)}
                  onKeyPressCapture={(event: any) => event.key === 'Enter' && handleMarkupIsSet()}
                  onBlur={() => handleMarkupIsSet()}
                  fullWidth
                  autoFocus
                />
            }
          </div>
          {
            negativeMarkup && <Alert severity="error">No -ve markups allowed</Alert>
          }
        </div>;
      case 'final':
        return <div className="row additional-markup-input-row">
          <div className="col-sm-8 fare-breakdown-text my-auto">
            <p className="standard-text">{t("common.fareBreakdown.additionalMarkup")}</p>
          </div>
          <div className="col-sm-4 fare-breakdown-price my-auto">
            <p className="standard-text">{formatPrice(props.additionalMarkup, props.currency)}</p>
          </div>
        </div>;
      case 'set':
        return <div className="row additional-markup-input-row">
          <div className="col-sm-8 fare-breakdown-text my-auto edit-additional-markup-row">
            <p className="standard-text">{t("common.fareBreakdown.additionalMarkup")}</p>
            <EditIcon
              className="btn-edit-additional-markup"
              color="disabled"
              onClick={() => {
                setAddMarkupView('editing');
              }}
              fontSize="small"
            />
          </div>
          <div className="col-sm-4 fare-breakdown-price my-auto">
            <p className="standard-text">{formatPrice(props.additionalMarkup, props.currency)}</p>
          </div>
        </div>;
      default: return <div/>;
    }
  }

  return (
    getComponent()
  );
}