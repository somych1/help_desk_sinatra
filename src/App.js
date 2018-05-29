import React, { Component } from 'react';
import './App.css';
import Driver from './Driver'
import Employee from './Employee'

class App extends Component {
  constructor(){
    super(),
    this.state = {
      loggedIn: false,
      loginError: '',
    }
  }
  login = async (username, password) => {
    const empLogin = await fetch('http://localhost:9292/emp/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const loginResponse = await empLogin.json()
    console.log(loginResponse, 'this is loginResponse')
    if(loginResponse.success){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loginError: loginResponse.message
      })
    }
  }

  register = async (name, username, password, manager) => {
    const empRegister = await fetch('http://localhost:9292/emp/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        manager: manager
      })
    })
    const registrationResponse = await empRegister.json();
    console.log(registrationResponse, 'this is registrationResponse')
    if(registrationResponse.success){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loginError: registrationResponse.message
      })
    }
  }
  logout = async () => {
    const empLogout = await fetch('http://localhost:9292/emp/logout', {
        method: 'GET'
    });
    const logoutResponse = await empLogout.json();
    this.setState({
      loggedIn: false
    })
  }

  // driver register
  driverRegister = async (name, username, password, truck, make, model, year) => {
    const driverRegister = await fetch('http://localhost:9292/driver/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        truck_num: truck,
        make: make,
        model: model,
        yearL: year
      })
    })
    const registrationResponse = await driverRegister.json();
    console.log(registrationResponse, 'this is registrationResponse')
    if(registrationResponse.success){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loginError: registrationResponse.message
      })
    }
  }
  login = async (username, password) => {
    const driverLogin = await fetch('http://localhost:9292/driver/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const loginResponse = await driverLogin.json()
    console.log(loginResponse, 'this is loginResponse')
    if(loginResponse.success){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loginError: loginResponse.message
      })
    }
  }
  render() {
    return (
      <div className="App">

        <Employee register={this.register} login={this.login}/>
        <Driver driverLogin={this.driverLogin} driverRegister={this.driverRegister}/>
      </div>
    );
  }
}

export default App;
