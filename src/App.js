import React, { Component } from 'react';
import './App.css';
import DriverApp from './DriverApp'
import EmployeeApp from './EmployeeApp'

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
        <button id="driver" onClick={this.handleClick}>Driver</button>

      

        <button id="employee" onClick={this.handleClick}>Employee</button>
      </div>
      :
      <div className="App">
        {this.state.whichApp === "driver" ? <DriverApp/> : <EmployeeApp/>}
      </div> 
    );
  }
}

export default App;