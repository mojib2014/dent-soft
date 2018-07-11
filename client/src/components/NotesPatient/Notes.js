import React from "react";
import { Col} from "reactstrap";
import "./Notes.css";

const Notes = ({children}) => {
    return (
        <Col md="7" className="InfoBoxRight list-overflow-container rounded">
            <h2>Notes from your Dentist:</h2>
            <ul className="list-group" id="noteList">
                {children}
            </ul>
        </Col>      
    )
}

export default Notes;