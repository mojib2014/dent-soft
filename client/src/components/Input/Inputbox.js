import React from 'react';
import {InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';
import API from "../../utils/API";
// import PropTypes from 'prop-types';
// import "./Inputbox.css";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import AccountCircle from '@material-ui/icons/AccountCircle';



class Inputbox extends React.Component  {
  
    state = {
        record: "",
        note:"",
    }
    

    handleInfoInput = (event) => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSearchById = (event) => {
        event.preventDefault();
        
        let id = this.state.id
        // console.log(id)
        API.searchById(id)
        .then((result)=>{
            // console.log(result.data)
            this.setState({
                record: result.data.record,
                note: result.data.note
            })
        })
        .catch(err=> console.log(err));
    }

    render(){
        return (
          
          <div className="box">

          <InputGroup>
            <Input 
                name = "record"
                value= {this.state.record}
                onChange={this.handleRecordInput} />
            <InputGroupAddon addonType="prepend"><Button onClick={this.handleSearchById} className="recordBtn" size="sm">Add Record</Button></InputGroupAddon>
          </InputGroup>

          <InputGroup>
            <Input 
                name = "note"
                value= {this.state.note}
                onChange={this.handleRecordInput}
            />
            <InputGroupAddon addonType="prepend"><Button onClick={this.handleSearchById} className="noteBtn" size="sm">Add Note</Button></InputGroupAddon>
          </InputGroup>
        
            
          </div>
        );
      }

}

export default Inputbox;