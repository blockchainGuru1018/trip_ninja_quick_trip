import React, { useEffect } from 'react';

declare global {
  interface Window {
      $sherpa:any;
  }
}

export default function TravelRestrictions() {

  const widgetOptions = {
    "requirementsApiKey": "AIzaSyCPoPHzAZzxPMh3gMuXz4Mwjcz3vSA3wTo",
    "affiliateId": "tripninja",
    "defaultNationalityCountry": "CAN",
    "finalAirportName": "",
    "language": "en",
    "currency": "CAD",
    "itinerary":  [{
      "originCountry": "CAN",
      "destinationCountry": "USA",
    }],
    "travellers": [{
      "displayName": "Mr Smith",
      "nationality": "CAN"
    }]
  };

  useEffect(() => {
    const sherpa = window.$sherpa;
    sherpa.V1.createWidget(widgetOptions);
  });

  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <div id="sherpa-widget" className="travel-restrictions-container"></div>
      </div>
    </div>    
  );
}
