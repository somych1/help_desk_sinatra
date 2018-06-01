import React, { Component } from 'react';
import './App.css';
import DriverApp from './DriverApp'
import EmployeeApp from './EmployeeApp'
import { Button } from 'reactstrap';

class App extends Component {
  constructor(){
    super(),
    this.state = {
      buttons: true,
      whichApp: ''
    }
  }

  handleClick = (e) => {
    console.log(e.currentTarget.id)
    this.setState({
      buttons: false,
      whichApp: e.currentTarget.id
    })
  }

  render() {
    return (
      this.state.buttons 
      ?
      <div className="App"> 
        <Button outline color="primary" id="driver" onClick={this.handleClick}>Driver</Button> <Button outline color="primary" id="employee" onClick={this.handleClick}>Employee</Button>
      </div>
      :
      <div className="App">
        {this.state.whichApp === "driver" ? <DriverApp/> : <EmployeeApp/>}
      </div> 
    );
  }
}

export default App;