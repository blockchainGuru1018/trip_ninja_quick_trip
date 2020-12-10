
import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import history from '../History';
import {getLayoverTime, getTodaysDate} from "../helpers/DateHelpers";
import { AuthDetails } from "../auth/AuthInterfaces";
import { FlightResultsDetails, Results, defaultResults, ResultsDetails, Segment } from "../trip/results/ResultsInterfaces";
import FlightResultsPath from "../common/FlightResultsPath";
import { Booking, BookingItinerary, BookingSegment } from "./BookingsInterfaces";
import { BookingDetails, PassengerInfo } from "../trip/book/BookInterfaces";
import { withTranslation, WithTranslation } from "react-i18next";
import FareRulesPreview from "../common/FareRulesPreview";
import { prepareSvgForPdf } from "../helpers/PdfHelpers";
import FareBreakdown from "../common/FareBreakdown";
import { PricingDetails } from "../trip/results/PricingInterfaces";
import { getFlightDetailsBySegment } from "../helpers/FlightDetailsHelper";
import { setErrorDetails } from "../actions/ResultsActions";
import DefaultModal from "../common/modals/DefaultModal";
import { getLinkedViSegment } from "../helpers/VirtualInterliningHelpers";
import i18n from '../i18n';
import { dateLocaleMap } from '../localeMap';
import { format } from 'date-fns';

interface  PDFItineraryDownloadProps extends WithTranslation {
  authDetails: AuthDetails;
  booking?: Booking;
  params?: any;
  resultsDetails: ResultsDetails;
  pricingDetails: PricingDetails;
  bookingDetails: BookingDetails;
  setErrorDetails: typeof setErrorDetails;
}

interface PDFItineraryState {
  type: string;
  trip: Results
}

export class PDFItineraryDownload extends React.Component<PDFItineraryDownloadProps> {
  state: PDFItineraryState = {
    type: '',
    trip: defaultResults,
  }

  componentWillMount() {
    this.setState(
      {
        ...this.state,
        type: history.location.state,
        trip: this.props.resultsDetails[this.props.resultsDetails.tripType]
      });
  }

  componentDidMount() {
    this.downloadItineraryPdf();
  }

  render() {
    const segments: Array<Segment | BookingSegment> = this.getSegmentsList();
    const numPages: number = Math.round(segments.length / 2) + 2;
    return (
      <div>
        <DefaultModal loading={true} primaryText={this.props.t("bookings.pdf.modalLoadingPrimary")} />
        <div id='itinerary-pdf-page-front' className='itinerary-pdf-page front-page'>
          {this.getFrontPageHTML()}
          {this.getPageNumHTML(1, numPages, true)}
        </div>
        {this.createItineraryDetailsHTML(segments, numPages)}
        {this.fareInfoHtml(numPages)}
      </div>
    );
  }

  getFrontPageHTML = () =>
    <div className='front-page-title-container'>
      <h1 className='text-white'>{this.props.authDetails.agency.toUpperCase()}</h1>
      <h2 className='text-white'>{this.props.t("bookings.pdf.title").toUpperCase()}</h2>
      <p className='text-white'>
        {format(new Date(this.props.booking ? this.props.booking.booking_date+'T00:00:00.000' : new Date()), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
      </p>
      <div className='pdf-title-page-created-by'>
        <h2 className='text-bold text-white'>{`${this.props.t("bookings.pdf.createdBy").toUpperCase()}:`}</h2>
        <h2 className='text-white'>{`${this.props.authDetails.userFirstName.toUpperCase()} ${this.props.authDetails.userLastName.toUpperCase()}`}</h2>
        <h2 className='text-white'>{this.props.authDetails.agency.toUpperCase()}</h2>
      </div>
    </div>

  getPageNumHTML = (pageNum: number, totalPageNum: number, white?: boolean) =>
    <p className={`text-small pdf-page-footer ${white && 'text-white'}`}>
      {`${this.props.t("common.pdf.page")} ${pageNum} / ${totalPageNum} | ${this.props.t("bookings.pdf.title")}`}
    </p>

  fareInfoHtml = (numPages: number) => {
    const trip = this.props.resultsDetails[this.props.resultsDetails.tripType];
    return (
      <div id='itinerary-pdf-page-last' className='itinerary-pdf-page itinerary-pdf-page-last'>
        {this.state.type === 'booking'
          ? <FareBreakdown
            pricing={this.props.booking!.details!.pricing}
            currency={this.props.booking!.currency}
            markupVisible={this.props.authDetails.markupVisible}
            expanded={true}
            itineraries={this.props.booking!.details!.itinerary}
          />
          : <FareBreakdown
            trip={trip}
            actives={[...this.props.resultsDetails.activeSegments.values()]}
            pricing={this.props.pricingDetails!.pricing!}
            currency={this.props.pricingDetails!.currency}
            markupVisible={this.props.authDetails.markupVisible}
            pathSequence={this.props.resultsDetails[this.props.resultsDetails.tripType].path_sequence}
            expanded={true}
            flightDetailsDisplay={true}
          />
        }
        {this.passengerInfoHtml()}
        {this.getPageNumHTML(numPages, numPages)}
      </div>
    );
  }

  passengerInfoHtml = () => {
    let passengers: Array<PassengerInfo> = this.props.booking?.details?.passengers ? this.props.booking?.details?.passengers : this.props.bookingDetails.passengers;
    return (
      <div>
        { (this.props.booking?.details?.passengers || this.props.bookingDetails.passengers[0].updated) &&
          <h5 className="passenger-section-header">Passengers</h5>
        }
        { passengers.map((passenger: PassengerInfo) => {
          return <p key={passenger.first_name} className="passenger-name">{passenger.first_name} {passenger.last_name}</p>;
        })}
      </div>
    );
  }

  getSegmentsList = () => {
    let segmentList: Array<BookingSegment | Segment> = [];
    let segmentCount: number = 0;
    if (this.state.type === 'booking') {
      this.props.booking!.details!.itinerary!.forEach(
        (bookingItinerary: BookingItinerary) => bookingItinerary.segments.forEach(
          (bookingSegment: BookingSegment) => {
            segmentCount += bookingSegment.virtual_interline && bookingSegment.vi_position === 1 ? 1 : 0;
            segmentList.splice(bookingSegment.segment_id + segmentCount, 0, bookingSegment);
          })
      );
    } else {
      const activeSegments: Array<Segment> =  [...this.props.resultsDetails.activeSegments.values()];
      activeSegments.forEach((activeSegment: Segment) => {
        const segmentPosition: number = activeSegment.segment_position;
        segmentList.splice(segmentPosition + segmentCount, 0, activeSegment);
        if (activeSegment.virtual_interline) {
          const viRelatedSegment: Segment | undefined = getLinkedViSegment(activeSegment, this.state.trip.segments[segmentPosition]);
          segmentCount += 1;
          segmentList.splice(segmentPosition + segmentCount, 0, viRelatedSegment!);
        }
      });
    }
    return segmentList;
  }

  createItineraryDetailsHTML = (segments: Array<any>, numPages: number) => {
    let segmentCount: number = 0;
    let detailsHTML: any = [];
    [...Array(numPages - 2).keys()].forEach((page: any) => {
      const segment = segments[segmentCount];
      if (!segment.virtual_interline || segment.vi_position !== 1) {
        let segmentHTML1: any = this.getSegmentHTML1(segments, segmentCount);
        segmentCount += segment.virtual_interline ? 2 : 1;
        const segmentHTML2 = segments[segmentCount - 1].virtual_interline || segments.length < segmentCount + 1
          ? undefined
          : this.getSecondHTMLSegment(segmentCount, segments);
        segmentCount += segmentHTML2 ? 1 : 0;
        detailsHTML.push(
          <div key={page} id={`itinerary-pdf-page-${page}`} className='itinerary-pdf-page itinerary-details-pdf-page'>
            {segmentHTML1}
            {segmentHTML2}
            {this.getPageNumHTML(page + 2, numPages)}
          </div>
        );
      }
    });
    return detailsHTML;
  }

  getSegmentHTML1 = (segments: Array<any>, segmentCount: number) => {
    if (segments[segmentCount].virtual_interline) {
      return this.createViItineraryDetailHTML(segments, segmentCount);
    } else {
      return this.createItineraryDetailHTML(segments[segmentCount], segmentCount);
    }
  }

  getSecondHTMLSegment = (segmentCount: number, segments: Array<Segment | BookingSegment>) => {
    const nextSegment: Segment | BookingSegment = segments[segmentCount];
    if (!nextSegment.virtual_interline) {
      return this.createItineraryDetailHTML(nextSegment, segmentCount);
    }
    else {
      return undefined;
    }
  }

  createViItineraryDetailHTML = (segments: Array<any>, segmentCount: number) => {
    const viFlight1Details: Array<FlightResultsDetails> = this.getFlightDetails(segments[segmentCount]);
    const viFlight2Details: Array<FlightResultsDetails> = this.getFlightDetails(segments[segmentCount + 1]);

    return [
      <div>
        {this.createItineraryDetailHTML(segments[segmentCount], segmentCount)}
        <div className='self-transfer-pdf-page'>Self transfer layover | {
          getLayoverTime(viFlight1Details[viFlight1Details.length - 1], viFlight2Details[0])
        }</div>
      </div>,
      <div>
        {this.createItineraryDetailHTML(segments[segmentCount + 1], segmentCount, viFlight2Details, true)}
      </div>
    ];
  }

  getFlightDetails = (segment: any) =>
    this.state.type === 'booking'
      ? segment.flight_details
      : getFlightDetailsBySegment(segment, this.state.trip.flight_details);

  createItineraryDetailHTML = (segment: any, index: number, viFlightDetails?: Array<FlightResultsDetails>, viItinerary2?: boolean) => {
    const flightDetails: Array<FlightResultsDetails> = viFlightDetails ? viFlightDetails : this.getFlightDetails(segment);
    const currency: string = this.state.type === 'booking'
      ? this.props.booking!.currency
      : this.props.pricingDetails.currency;
    return(
      <div className={`itinerary-detail-pdf-page`}>
        {!viItinerary2 && this.getItineraryTitleHTML(flightDetails, viFlightDetails)}
        <div className='flight-results-path-pdf-container'>
          <FlightResultsPath
            flightDetails={flightDetails}
            key={index}
          />
          <FareRulesPreview
            bookingSegment={this.state.type === 'booking' ? segment : undefined}
            segment={this.state.type !== 'booking' ? segment : undefined}
            flightDetails={flightDetails}
            currency={currency}
            itineraryDisplay={true}
            index={index}
            bookingDrawer={true}
          />
        </div>
      </div>
    );
  }

  getItineraryTitleHTML = (flightDetails: Array<FlightResultsDetails>, viFlightDetails?: Array<FlightResultsDetails>) => {
    const flightString = viFlightDetails
      ? `${flightDetails[0].origin_name} to ${viFlightDetails[viFlightDetails.length - 1].destination_name}`
      : `${flightDetails[0].origin_name} to ${flightDetails[flightDetails.length - 1].destination_name}`;
    return (
      <div className='itinerary-title-pdf-page'>
        <h1 className='front-page-pdf-title'>
          {format(new Date(flightDetails[0].departure_time), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}
        </h1>
        <h2 className='front-page-pdf-sub-title'>{flightString}</h2>
      </div>
    );
  }

  setPdfPages = (pdf: any, pdfPageList: any) => {
    pdfPageList.forEach((page: any, index: number) => {
      if (index !== 0) {
        pdf.addPage();
        pdf.setPage(index + 2);
      }
      pdf.addImage(page, 'image/png', 0, 0, 320, 415, undefined, "FAST");
    });
    return pdf;
  }

  createPdfPageList = (numPages: number) => {
    const pageListPromises = [...Array(numPages).keys()].map((pageNum: number) =>
      this.getDataFromElement(`itinerary-pdf-page-${pageNum}`)
    );
    pageListPromises.unshift(this.getDataFromElement('itinerary-pdf-page-front'));
    pageListPromises.push(this.getDataFromElement('itinerary-pdf-page-last'));
    return Promise.all(pageListPromises);
  }

  getDataFromElement = (id: string) => {
    const element: HTMLElement | null = document.getElementById(id);
    return element &&
      html2canvas(element).then(
        (canvas: HTMLCanvasElement) => canvas.toDataURL('image/png', 1)
      );
  }

  downloadItineraryPdf = async () => {
    prepareSvgForPdf();
    const numPages: number = Math.round(this.getSegmentsList().length / 2);
    const pdfPageList = await this.createPdfPageList(numPages);
    const pdf = new jsPDF('p', 'px', [320, 415]);
    try {
      const updatedPdf = this.setPdfPages(pdf, pdfPageList);
      updatedPdf.save(`itinerary-${getTodaysDate(true)}.pdf`);
      history.goBack();
    }
    catch (e) {
      this.props.setErrorDetails(true, 'pdf');
      history.goBack();
    }
  }
}

export default withTranslation('common')(PDFItineraryDownload);