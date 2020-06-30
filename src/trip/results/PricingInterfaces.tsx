

export interface PricingPayload {
    trip_id: string;
    trip_type: string;
    traveller_list: Array<string>;
    currency: string;
    price: number;
    markup?: number;
    itineraries?: Array<object>;
  }

export interface Itineraries{
    itinerary_reference: number;
    plating_carrier?: string;
    credentials: Credentials; //TODO: Credentials object.
    itinerary_type:string;
    segments: Array<FlightSegment>;
}


export interface FlightSegment{
    segment_id: string;
    flights: Array<Flight> ; //TODO: Array<Flight>
}

export interface Flight{
    key: number;
    origin: string;
    destination: string;
    booking_code: string;
    cabin_class?: string;
    carrier: string;
    flight_time?: number;
    flight_number: string;
    departure_time: string;
    arrival_time?: string;
    brand_identifier?: string;
}

export interface Credentials{
    data_source: string;
    pcc?: string;
    provider?: string;
    region?: string;
}

