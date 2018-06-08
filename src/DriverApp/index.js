import React, {Component} from "react";
import Driver from '../Driver'
import DriverNavigationBar from '../DriverNavigationBar'
import CreateOrder from '../CreateOrder'
import OrdersIndex from '../OrdersIndex'
import OrderDetail from '../OrderDetail'


class DriverApp extends Component {
  constructor(){
    super(),
    this.state = {
      empName: '',
      order: [],
      orders: [],
      loggedIn: false,
      loginError: '',
      ordersIndex: true,
      newOrder: false,
      detail: false
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
        yearL: year,
        manager: false
      })
    })
    const registrationResponse = await driverRegister.json();
    console.log(registrationResponse, 'this is registrationResponse')
    if(registrationResponse.success){
      this.setState({
        loggedIn: true
      })
      this.getOrders()
      .then((orders) => {
        this.setState({orders: orders.order})
      })
      .catch((err) => {
        console.log(err);
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
      this.getOrders()
      .then((orders) => {
        this.setState({orders: orders.order})
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this.setState({
        loginError: loginResponse.message
      })
    }
  }
  homeButton = () => {
    this.setState({
      ordersIndex: true,
      newOrder: false,
      detail: false
    })
  }
  logout = async () => {
    const driverLogout = await fetch('http://localhost:9292/driver/logout', {
        method: 'GET'
    });
    const logoutResponse = await driverLogout.json();
    this.setState({
      empName: '',
      order: [],
      orders: [],
      loggedIn: false,
      loginError: '',
      ordersIndex: true,
      newOrder: false,
      detail: false
    })
  }

  getOrders = async () => {
    const allOrders = await fetch('http://localhost:9292/orders', {
      method: 'GET',
      credentials: 'include'
    })
    const orders = await allOrders.json()
    console.log(orders, 'this is response in getOrders')
    return orders
  }

  createNewOrder = () => {
    this.state.newOrder ? this.setState({ordersIndex: true}) : this.setState({ordersIndex: false})
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
        description: description,
        completed: false,
        comment: 'new repair'
      })
    })
    const response = await newOrder.json()
    this.getOrders()
      .then((orders) => {
        this.setState({orders: orders.order})
      })
      .catch((err) => {
        console.log(err);
      })
    this.createNewOrder()
  }

  // order detail
  orderDetail = async (e) => {
    const id = e.currentTarget.id
    const order = await fetch('http://localhost:9292/orders/' + id, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await order.json()
    console.log(response, 'this is response in detail')
    this.setState({
      order: response.order,
      detail: true,
      ordersIndex: false,
      newOrder: false,
    })
    const employeeId = response.order.employee_id
    if (response.success && employeeId) {
      const employee = await fetch('http://localhost:9292/emp/' + employeeId, {
        method: 'GET',
        credentials: 'include'
      })
      const empResponse = await employee.json()
      if (empResponse.success){
        this.setState({
          empName: empResponse.employee.name
        })
      } 
    }
  }



  render() {
    return (
      <div>
        { this.state.loggedIn ?
          <div>
            <DriverNavigationBar createNewOrder={this.createNewOrder} homeButton={this.homeButton} logout={this.logout}/>
            {this.state.ordersIndex ? <OrdersIndex orders={this.state.orders} orderDetail={this.orderDetail}/>
              : <div>
                {this.state.newOrder ? <CreateOrder manager={this.state.manager} createOrder={this.createOrder}/>
                : <div>
                  {this.state.detail ? <OrderDetail order={this.state.order} empName={this.state.empName}/> : null}
                </div>
                }
              </div>
            }
          </div>
          : <Driver login={this.login} register={this.register}/>
        }
      </div>
    );
  }
}

export default DriverApp;