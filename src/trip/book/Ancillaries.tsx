import React from 'react';
import AdditionalBaggageModal from './AdditionalBaggageModal';
import Button from '@material-ui/core/Button';
import { PricedItinerary } from '../results/PricingInterfaces';
import { Segment } from "../results/ResultsInterfaces";
import { PassengerInfo } from './BookInterfaces';
import { useTranslation } from 'react-i18next';
import { updatePassengerInfo } from '../../actions/BookActions';
import { updateAncillariesAmount } from '../../actions/PricingActions';

interface AncillariesProps {
  activeSegments: Array<Segment>;
  passengers: Array<PassengerInfo>;
  pricedItineraries: Array<PricedItinerary>;
  currency: string;
  updatePassengerInfo: typeof updatePassengerInfo;
  updateAncillariesAmount: typeof updateAncillariesAmount;
}

export default function Ancillaries(props: AncillariesProps) {
  const [ t ] = useTranslation('common');
  const [modalOpen, setModalOpen] = React.useState(false);

  return(
    <div>
      <h5>{t('book.ancillaries.ancillaries')}</h5>
      <div className="book-container">
        <div className="row">
          <div className="col-sm-8 my-auto">
            <p className="text-bold">{t('book.ancillaries.additionalBaggage')}</p>
          </div>
          <div className="col-sm-4">
            <Button 
              variant="contained"
              color="secondary"
              size="small"
              className="float-right"
              onClick={(e) => setModalOpen(!modalOpen)}
              disableElevation
            >
              {t('book.ancillaries.modify')}
            </Button>
            <AdditionalBaggageModal 
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              activeSegments={props.activeSegments}
              passengers={props.passengers}
              pricedItineraries={props.pricedItineraries}
              currency={props.currency}
              updatePassengerInfo={props.updatePassengerInfo}
              updateAncillariesAmount={props.updateAncillariesAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}