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
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone:</p>
            </Col>
          </Row>
                <p>Record:</p>
                <p>Note:</p>    
        </div>
      );
}

export default FindInfo;