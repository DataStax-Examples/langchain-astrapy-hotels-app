import { useState, useEffect } from "react"
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCol,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

import '../App.css';
import {HotelCardProps} from "../../schema/props";
import {RequestStatus} from "../../schema/enums";
import {HotelType} from "../../schema/data";

import {baseHotelSummary} from "../../utils/hotel_search";

const HotelCardComponent = (props: HotelCardProps) => {

  const [summaryStatus, setSummaryStatus] = useState<RequestStatus>("initialized");
  const [hotelSummary, setHotelSummary] = useState<string[] | undefined>(undefined);

  const {
    hotel,
    setDetailsHotel,
    setSearchStep,
  } = props;

  useEffect(
    () => {
      console.log(`getting the summary for ${hotel.id}`);
      setSummaryStatus("in_flight")

      const callback = (results: any) => {
        setHotelSummary(results.summary);
        setSummaryStatus("completed");
      }

      const errback = () => {
        setSummaryStatus("errored");
        console.log("ERROR (baseHotelSummary)!");
      }

      baseHotelSummary(hotel, hotel.id, callback, errback);
    },
    [hotel]
  );

  const rndHotelIndex = (hotel: HotelType) => {
    return 1 + (hotel.id.charCodeAt(0) + hotel.id.charCodeAt(1) + hotel.id.charCodeAt(7)) % 100;
  }

  return ( <MDBCol>
    <MDBCard className='h-100'>
      <MDBCardBody>
        <MDBCardImage
          className="hotelThumbnail"
          src={`https://source.unsplash.com/collection/2048188/${rndHotelIndex(hotel)}`}
          position='top'
        />
        <MDBCardTitle>{hotel.name}</MDBCardTitle>
        <MDBCardText>
          { (summaryStatus === "in_flight") && <span>
            ...
          </span> }
          { (summaryStatus === "errored") && <span>
            (Could not get hotel summary)
          </span> }
          { (summaryStatus !== "in_flight" && summaryStatus !== "errored") &&
            <MDBTypography listUnStyled className='mb-0'>
              { (hotelSummary || ["(no summary available)"]).map( (itm, i) =>
                  <li key={i} className='mb-1'>
                    <MDBIcon fas icon="sticky-note" className='me-2 text-success' />
                    {itm}
                  </li>
                )
              }
            </MDBTypography>
          }
        </MDBCardText>
        <MDBBtn
          onClick={() => {setDetailsHotel(hotel); setSearchStep("details");}}
        >
          Details
        </MDBBtn>
      </MDBCardBody>
      { (hotel.review_count) && <>
        <MDBCardFooter>
          <small className='text-muted'>{hotel.city}, {hotel.country} / {hotel.review_count.count}{(hotel.review_count.at_ceiling) ? "+" : ""} review{(hotel.review_count.count !== 1) ? "s" : ""}</small>
        </MDBCardFooter>
      </> }
    </MDBCard>
  </MDBCol> );
}

export default HotelCardComponent
