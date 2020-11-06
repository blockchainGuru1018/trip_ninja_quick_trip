
import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import history from '../History';
import {getTodaysDate} from "../helpers/DateHelpers";

class PDFItineraryDownload extends React.Component {
  componentDidMount() {
    this.downloadItineraryPdf();
  }

  render() {
    return (
      <div id='itineraryPdfDownload'>
        Itinerary Details Here
      </div>
    );
  }

  downloadItineraryPdf = () => {
    const input: HTMLElement | null = document.getElementById('itineraryPdfDownload');
    if (input) {
      html2canvas(input)
        .then((canvas: HTMLCanvasElement) => {
          console.log(canvas);
          const imgData: string = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          // @ts-ignore
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.addPage();
          pdf.setPage(2);
          // @ts-ignore
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save(`itinerary-${getTodaysDate()}.pdf`);
          history.goBack();
        });
    } else {
      // Some sort of error modal here for failed pdf.
      history.goBack();
    }
  }
}

export default PDFItineraryDownload;