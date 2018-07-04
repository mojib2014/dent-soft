import React from "react";
import "./Findinfo.css";
import { Row, Col} from "reactstrap";
import Inputbox from "../Input/Inputbox";
import { Button } from 'semantic-ui-react';




const FindInfo = (props) => {
    
    return(
        <div className="container">
          <Row>
            <Col className="pic-col">
                {/* <img className="pic"  width="100%" src="http://www.vstou.com/upload/image/479/201612/1482323427118703.jpg" alt="Card Cap" /> */}
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
            <div className="addInfo">
                <div>
                    <Inputbox />
                   
                </div>
                <div></div>
            </div>
          </Row>
              
        </div>
    )
}

export default FindInfo;