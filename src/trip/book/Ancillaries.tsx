import React from 'react';
import AdditionalBaggageModal from './AdditionalBaggageModal';
import Button from '@material-ui/core/Button';
import { Segment } from "../results/ResultsInterfaces";
import { Passenger } from '../search/SearchInterfaces';
import { useTranslation } from 'react-i18next';

interface AncillariesProps {
  activeSegments: Array<Segment>,
  passengers: Array<Passenger>;
}

export default function Ancillaries(props: AncillariesProps) {
  const [ t ] = useTranslation('common');
  const [modalOpen, setModalOpen] = React.useState(false);

  return(
    <div>
      <h5>Ancillaries</h5>
      <div className="book-container">
        <div className="row">
          <div className="col-sm-8 my-auto">
            <p className="text-bold">Additional Baggage</p>
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
              Add 
            </Button>
            <AdditionalBaggageModal 
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              activeSegments={props.activeSegments}
              passengers={props.passengers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}