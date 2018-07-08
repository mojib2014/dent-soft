import React from "react";
import "./Findinfo.css";
import { Row, Col} from "reactstrap";
import Inputbox from "../Input/Inputbox";


const FindInfo = (props) => {
    
    return(
        <div className="container">
          <Row>
            <Col className="pic-col">
                <img src={props.userImage} alt="User"/>
            </Col>
            <Col>
                <div className="basicInfo">
                    <p>Name: {props.userName}</p>
                    <p>Phone: {props.userPhone}</p>
                    <p>Email: {props.userEmail}</p>  
                </div>
            </Col>
          </Row>
          <Row>
            <div className="editInfo">
                <div className="recordInfo"><h3>Record: {props.userRecord}</h3></div>
                <div className="noteInfo"><h3>Note: {props.userNote}</h3></div>
            </div>
          </Row>
          <Row>
            {/* <div className="addInfo">
                <div>
                    <Inputbox />
                   
                </div>
                <div></div>
            </div> */}
          </Row>
              
        </div>
    )
}

export default FindInfo;