import React from "react";
import "./Findinfo.css";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col} from "reactstrap";


const FindInfo = () => {
    
    return (
        <div className="container">
          <Row>
            <Col className="pic-col" md="4" sx="4">
                <img className="pic" top width="100%" src="http://www.vstou.com/upload/image/479/201612/1482323427118703.jpg" alt="Card image cap" />
               
            </Col>
            <Col md="8" sx="8">
                <div className="basicInfo">
                    <p>Name:</p>
                    <p>Phone:</p> 
                    <p>Email:</p>  
                </div>
            </Col>
          </Row>
          <Row>
            <div className="editInfo">
                <div className="recordInfo"><h3>Record:</h3></div>
                <div className="noteInfo"><h3>Note:</h3></div>
            </div>
          </Row>
              
        </div>
      );
}

export default FindInfo;