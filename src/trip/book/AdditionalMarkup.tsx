import {withTranslation, WithTranslation} from "react-i18next";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { updateAdditionalMarkup } from '../../actions/BookActions';
import {Add} from "@material-ui/icons";

interface AdditionalMarkupProps extends WithTranslation {
    additionalMarkupDisplay?: boolean;
    currency: string;
    additionalMarkup?: number;
    updateAdditionalMarkup: typeof updateAdditionalMarkup
}

class AdditionalMarkup extends React.Component<AdditionalMarkupProps>{
  render() {
    console.log("Additional markup after render ", this.props.additionalMarkup);
    return (
      <div>
        {this.props.additionalMarkupDisplay &&
        <div className="row">
          <TextField
            id="additional-markup"
            label={this.props.t("common.fareBreakdown.additionalMarkup")}
            variant="outlined"
            type="number"
            value={this.props.additionalMarkup}
            onChange={(event: any) => this.props.updateAdditionalMarkup(event.target.value)}
            fullWidth
          />
        </div>
        }
      </div>
    );
  }
}

export default withTranslation('common')(AdditionalMarkup);