
import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import history from '../History';
import { getTodaysDate } from "../helpers/DateHelpers";
import { AuthDetails } from "../auth/AuthInterfaces";
import { FlightResultsDetails, ResultsDetails, Segment } from "../trip/results/ResultsInterfaces";
import FlightResultsPath from "../common/FlightResultsPath";
import { Booking, BookingItinerary, BookingSegment } from "./BookingsInterfaces";
import { format } from 'date-fns';
import { dateLocaleMap } from "../localeMap";
import i18n from "../i18n";
import { withTranslation, WithTranslation } from "react-i18next";
import FareRulesPreview from "../common/FareRulesPreview";
import { prepareSvgForPdf } from "../helpers/PdfHelpers";
import FareBreakdown from "../common/FareBreakdown";
import { PricingDetails } from "../trip/results/PricingInterfaces";
import { getFlightDetailsBySegment } from "../helpers/FlightDetailsHelper";
import { setErrorDetails } from "../actions/ResultsActions";
import DefaultModal from "../common/modals/DefaultModal";

interface  PDFItineraryDownloadProps extends WithTranslation {
  authDetails: AuthDetails;
  booking?: Booking;
  params?: any;
  resultsDetails: ResultsDetails;
  pricingDetails: PricingDetails;
  setErrorDetails: typeof setErrorDetails;
}

class PDFItineraryDownload extends React.Component<PDFItineraryDownloadProps> {
  state = {
    type: ''
  }

  componentWillMount() {
    this.setState({...this.state, type: history.location.state});
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
        {this.getPageNumHTML(numPages, numPages)}
      </div>
    );
  }

  getSegmentsList = () => {
    if (this.state.type === 'booking') {
      let segmentList: Array<BookingSegment> = [];
      this.props.booking!.details!.itinerary!.forEach(
        (bookingItinerary: BookingItinerary) => bookingItinerary.segments.forEach(
          (bookingSegment: BookingSegment) => {
            const segment_id: number = bookingSegment.virtual_interline
              ? bookingSegment.vi_position
              : bookingSegment.segment_id;
            segmentList[segment_id] = bookingSegment;
          }));
      return segmentList;
    } else {
      return [...this.props.resultsDetails.activeSegments.values()];
    }
  }

  createItineraryDetailsHTML = (segments: Array<any>, numPages: number) => {
    let segmentCount: number = 0;
    let detailsHTML: any = [];
    [...Array(numPages - 2).keys()].forEach((page: any) => {
      const segment = segments[segmentCount];
      if (!segment.virtual_interline || segment.vi_position !== 1) {
        const segmentHTML1 = segments[segmentCount].virtual_interline
          ? this.createViItineraryDetailHTML(segments, segmentCount)
          : this.createItineraryDetailHTML(segments[segmentCount], segmentCount);
        segmentCount += 1;
        const segmentHTML2 = segments[segmentCount - 1].virtual_interline || segments.length < segmentCount + 1
          ? undefined
          : this.getSecondHTMLSegment(segmentCount, segments);
        segmentCount += segmentHTML2 ? 1 : 0;
        detailsHTML.push(
          <div id={`itinerary-pdf-page-${page}`} className='itinerary-pdf-page itinerary-details-pdf-page'>
            {segmentHTML1}
            {segmentHTML2}
            {this.getPageNumHTML(page + 2, numPages)}
          </div>
        );
      }
    });
    return detailsHTML;
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
    const viFlightDetails: Array<FlightResultsDetails> = segments[segmentCount + 1].flightDetails;
    return [
      <div>
        {this.createItineraryDetailHTML(segments[segmentCount], segmentCount)}
        <div className='self-transfer-pdf-page'>Self transfer layover | 4 hours</div>
      </div>,
      <div>
        {this.createItineraryDetailHTML(segments[segmentCount + 1], segmentCount, viFlightDetails, true)}
      </div>
    ];
  }

  createItineraryDetailHTML = (segment: any, index: number, viFlightDetails?: Array<FlightResultsDetails>, viItinerary2?: boolean) => {
    const trip = this.props.resultsDetails[this.props.resultsDetails.tripType];
    const flightDetails: Array<FlightResultsDetails> = this.state.type === 'booking'
      ? segment.flight_details
      : getFlightDetailsBySegment(segment, trip.flight_details);
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
        <h1 className='front-page-pdf-title'>{format(new Date(flightDetails[0].departure_time), this.props.t("bookings.bookingsTable.dateFormat"), {locale:dateLocaleMap[i18n.language]})}</h1>
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
      pdf.addImage(page, 'image/png', 0, 0);
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
        (canvas: HTMLCanvasElement) => canvas.toDataURL('image/png')
      );
  }

  downloadItineraryPdf = async () => {
    prepareSvgForPdf();
    const numPages: number = Math.round(this.getSegmentsList().length / 2);
    const pdfPageList = await this.createPdfPageList(numPages);
    const pdf = new jsPDF('p', 'px', [320, 415]);
    try {
      const updatedPdf = this.setPdfPages(pdf, pdfPageList);
      updatedPdf.save(`itinerary-${getTodaysDate()}.pdf`);
      history.goBack();
    }
    //TODO some sort of error modal or message here.
    catch (e) {
      this.props.setErrorDetails(true, 'pdf');
      history.goBack();
    }
  }
}

export default withTranslation('common')(PDFItineraryDownload);