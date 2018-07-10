import React from "react";
import { Col} from "reactstrap";
import "./Files.css";

const Files = ({children}) => {
    return (
        children ?
        <Col md="4" className="InfoBoxLeft rounded">
            <h2>Records</h2>
            <ul id="recordList">
                {children}
            </ul> 
        </Col>
            :
        <Col md="4" className="InfoBoxLeft rounded">
            <h2>Records</h2>
            <h3>No Records Available</h3>
        </Col>      
    )
}

export default Files;