import React from "react";
import "./Findinfo.css";
import { Row, Col} from "reactstrap";
import Inputbox from "../Input/Inputbox";
import { Button } from 'semantic-ui-react';




const FindInfo = () => {
    
    return (
        <div className="container">
          <Row>
            <Col className="pic-col" md="4" sx="4">
<<<<<<< HEAD
                <img className="pic" top width="100%" src="http://www.vstou.com/upload/image/479/201612/1482323427118703.jpg" alt="Card Cap" />
=======
                <img className="pic" top width="100%" src="http://www.vstou.com/upload/image/479/201612/1482323427118703.jpg" alt="Card image cap" />
               
>>>>>>> ef6f52c1df4bd153f35097afba0be896ead2e81c
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
          <Row>
            <div className="addInfo">
                <div>
                    <Inputbox />
                   
                </div>
                <div></div>
            </div>
          </Row>
              
        </div>
      );
}

export default FindInfo;