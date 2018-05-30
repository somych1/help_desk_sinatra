import React, {Component} from "react";
import Driver from '../Driver'
import DriverNavigationBar from '../DriverNavigationBar'
import CreateOrder from '../CreateOrder'


class DriverApp extends Component {
  constructor(){
    super(),
    this.state = {
      loggedIn: false,
      loginError: '',
      newOrder: false
    }
  }
  register = async (name, username, password, truck, make, model, year) => {
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

  logout = async () => {
    const driverLogout = await fetch('http://localhost:9292/driver/logout', {
        method: 'GET'
    });
    const logoutResponse = await driverLogout.json();
    this.setState({
      loggedIn: false
    })
  }

  createNewOrder = () => {
    this.setState({
      newOrder: !this.state.newOrder
    })
  }

  createOrder = async (title, description) => {
    const newOrder = await fetch('http://localhost:9292/orders', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
    const response = await newOrder.json()
    console.log(response, 'This is response from createOrder')
  }
  render() {
    return (
      <div>
        { this.state.loggedIn ?
          <div>
            <DriverNavigationBar createNewOrder={this.createNewOrder}/>
            {this.state.newOrder ? <CreateOrder createOrder={this.createOrder}/> : null}
          </div>
          :
          <Driver login={this.login} register={this.register}/>
        }
      </div>
    );
  }
}

export default DriverApp;