import React from "react";
import { Col} from "reactstrap";
import "./Booking.css";

const Booking = (props) => {
    return (
        props.date ? 
        <Col md="11" className="InfoBoxFull list-overflow-container rounded" id="Booking Info">
            <h2>Current Booking:</h2>
            <p>Date: {props.date}</p>
            <p>Start Time: {props.time}</p>
            <p>Details: {props.detail}</p>
        </Col>  
        :
        <Col md="11" className="InfoBoxFull list-overflow-container rounded" id="Booking Info">
            <h2>No Current Bookings</h2>  
        </Col> 
    )
}

export default Booking;