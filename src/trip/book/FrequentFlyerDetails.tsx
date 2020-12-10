import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { FlightResultsDetails, Segment } from "../results/ResultsInterfaces";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FlightLogo from "../../common/FlightLogo";
import airlineDf from '../../assets/data/airlineDf.json';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateFrequentFlyerCards } from "../../actions/BookActions";
import {FrequentFlyerCard, PassengerInfo} from "./BookInterfaces";

interface FrequentFlyerDetailsProps {
  bookingSegments: Array<Segment>;
  pathSequence: Array<string>;
  flights: Array<FlightResultsDetails>;
  currentPassengerIndex: number;
  updateFrequentFlyerCards: typeof updateFrequentFlyerCards;
  passenger: PassengerInfo;
}

export default function FrequentFlyerDetails(props: FrequentFlyerDetailsProps) {
  const [ t ] = useTranslation('common');

  const setAndUpdateFFCardProgram = (values: any, cardIndex: number, segmentId: string) => {
    const frequentFlyerCard: FrequentFlyerCard = props.passenger.frequentFlyerCards[cardIndex];
    let newFrequentFlyerCard: FrequentFlyerCard = {
      segmentId,
      cardSupplier: values.carrier_code,
      cardNumber: frequentFlyerCard ? frequentFlyerCard.cardNumber : '',
      programName: values.program_name
    };
    props.updateFrequentFlyerCards(props.currentPassengerIndex, cardIndex, newFrequentFlyerCard);
  };

  const setAndUpdateFFCardNumber = (number: number, cardIndex: number, segmentId: string) => {

  }

  const createCarrierInput = (cardIndex: number, segment: Segment) => (
    <FormControl fullWidth>
      <Autocomplete
        autoHighlight
        autoSelect
        id="passenger-country"
        options={airlineDf}
        getOptionLabel={(option: any) => option.program_name}
        value={getValueFromFrequentFlyerCard(cardIndex)}
        onChange={(_, values: any) => setAndUpdateFFCardProgram(values, cardIndex, segment.segment_id)}
        renderInput={(params) =>
          <TextField {...params}
            variant="outlined"
            placeholder={'Loyalty Program'}
          />
        }
      />
    </FormControl>
  );

  const getValueFromFrequentFlyerCard = (cardIndex: number) => {
    const frequentFlyerCard: FrequentFlyerCard = props.passenger.frequentFlyerCards[cardIndex];
    return frequentFlyerCard
      ? airlineDf.find((airlinePlan: any) => airlinePlan.program_name === frequentFlyerCard.programName)
      : '';
  };

  const createFrequentFlyerSegments = () => {
    return props.bookingSegments.map((bookingSegment: Segment, index: number) => (
      <div className="row" key={index}>
        <div className="col-sm-3">
          <p>{props.pathSequence[index]}</p>
          <FlightLogo
            flights={props.flights}
            itineraryDisplay={true}
          />
        </div>
        <div className="col-sm-3">
          {createCarrierInput(index, bookingSegment)}
        </div>
        <div className="col-sm-3">
          <TextField
            id={`frequent-flyer-number-${index}`}
            label={"Card Number"}
            variant="outlined"
            value={''}
            onChange={(event: any) => setAndUpdateFFCardNumber(event.target.value, index, )}
            fullWidth
            required
          />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h5>{t('book.passengerDetailsModal.loyaltyPrograms')}</h5>
      {
        createFrequentFlyerSegments()
      }
    </div>
  );
};

