import React from 'react';
import DefaultModal from './DefaultModal';
import './Modals.css';
import { Segment, FlightResultsDetails, ResultsDetails, Results } from '../../trip/results/ResultsInterfaces';
import '../../index.css';
import SegmentPreview from '../../trip/results/SegmentPreview';
import { updateActives, updateFareFamily, getTravelportBrands } from '../../actions/ResultsActions';
import { sortBySortOrder } from '../../helpers/SortHelper';
import { getFlightDetailsBySegment } from '../../helpers/FlightDetailsHelper';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Modals.css';
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      justifyContent: 'center',
      height: 'auto',
      overflow: 'hidden',
    },
    paper: {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 6px #00000029',
      border: '1px solid #ECEEEF',
      borderRadius: '5px',
      top: '142px',
      left: '130px',
      width: 'auto',
      height: 'auto',
      overflow: 'scroll',
    },
    backDrop: {
      height: '100vh'
    }
  }),
);

interface VIDetailsModalProps {
  index: number;
  segment: Segment;
  segments: Array<Segment>;
  segmentFlightDetails: Array<FlightResultsDetails>;
  segmentSelect: boolean;
  activeSegment?: Segment;
  segmentOptionsIndex?: number;
  currency: string;
  updateActives?: typeof updateActives;
  updateFareFamily?: typeof updateFareFamily;
  getTravelportBrands?: typeof getTravelportBrands;
  pathSequence?: Array<string>;
  totalPrice: number;
  trip: Results;
};

export function VIDetailsModal(props: VIDetailsModalProps) {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const getFlightDetailsBySegment = (segment: Segment): Array<FlightResultsDetails> =>
    segment.flights.map((flight: any) => {
      const filteredFlightDetails = props.trip.flight_details.filter(
        (flightDetails: FlightResultsDetails) =>
          flight.flight_detail_ref === flightDetails.reference
      );
      return filteredFlightDetails[0];
    });

  
  const getVISegments = (option_id: string, segments: Array<Segment>): Array<Segment> => {
    console.log("segments:", segments);
    const filteredSegments = segments.filter(
      (segment: Segment) =>
        segment.option_id === option_id
    );
    console.log("filtered segments:", filteredSegments);

    filteredSegments.sort((a:Segment, b: Segment) => {
      return a.vi_position! - b.vi_position!;
    });

    return filteredSegments;
  };


  const setSegmentsHTML = () => {

    console.log("index:", props.index);

    const VISegments: Array<Segment> = getVISegments(props.segment.option_id!, props.trip.segments[0]);

    return VISegments.map((segment: Segment, index: number) => {
      const segmentFlightDetails: Array<FlightResultsDetails> = getFlightDetailsBySegment(segment);
      return(
        <div key={index.toString()}>
          {!segment.filtered || segment.status === 'active'
            ? <SegmentPreview
              segment={segment}
              segments={props.segments}
              index={index}
              key={index}
              segmentFlightDetails={segmentFlightDetails}
              segmentSelect={props.segmentSelect}
              activeSegment={props.activeSegment}
              currency={props.currency}
              segmentOptionsIndex={props.segmentOptionsIndex}
              updateActives={props.updateActives}
              updateFareFamily={props.updateFareFamily}
              pathSequence={props.pathSequence}
              totalPrice={props.totalPrice}
              getTravelportBrands={props.getTravelportBrands}
              trip={props.trip}
              viDisplay={false}
            />
            : ''
          }
        </div>
      );
    });
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SettingsEthernetIcon fontSize="small" color='primary' className='incompatible-info-icon'/>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={() => <Backdrop open={open} className={classes.backDrop} />}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="row">
              <div className="float-right">
                <IconButton onClick={handleClose}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              </div>
            </div>
            <h2 id="transition-modal-title" className='search-modal-title'>VI Segments</h2>
            <div>
              {setSegmentsHTML()}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}