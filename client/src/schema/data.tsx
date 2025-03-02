interface CappedCounterType {
    count: number;
    at_ceiling: boolean;
}

export interface HotelType {
  city: string;
  country: string;
  review_count?: CappedCounterType;
  name: string;
  id: string;
}

export interface HotelReviewType {
  title: string;
  body: string;
  id: string;
  rating: number;
}

export interface CustomizedHotelDetailsType {
  name: string;
  reviews: HotelReviewType[];
  summary: string[];
}

export interface SuccessMarkerType {
  success: boolean;
}

export interface HotelSummaryType {
  request_id: string;
  reviews: HotelReviewType[];
  summary: string[];
}
