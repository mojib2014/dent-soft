import React from 'react';
import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';
// import PropTypes from 'prop-types';
// import "./Inputbox.css";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import AccountCircle from '@material-ui/icons/AccountCircle';



class Inputbox extends React.Component  {
  
  constructor(props) {
    super(props),
        this.state = {
            record: "",
            note:"",
        }
    }

    handleInfoInput = (event) => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    




    render(){
        return (
          
          <div className="box">

          <InputGroup>
            <Input 
                name = "record"
                value= {this.state.record}
                onChange={this.handleInfoInput} />
            <InputGroupAddon addonType="prepend"><Button className="recordBtn" size="sm">Add Record</Button></InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <Input 
                name = "note"
                value= {this.state.note}
                onChange={this.handleInfoInput}
            />
            <InputGroupAddon addonType="prepend"><Button className="noteBtn" size="sm">Add Note</Button></InputGroupAddon>
          </InputGroup>
        
            
          </div>
        );
      }

}

{/* Inputbox.propTypes = {
  classes: PropTypes.object.isRequired,
}; */}

export default Inputbox;