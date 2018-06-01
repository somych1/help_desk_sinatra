import React, {Component} from "react";
import EmployeeNavBar from '../EmployeeNavBar'
import EmployeeOrderCreate from '../EmployeeOrderCreate'
import OrdersIndex from '../OrdersIndex'
import OrderDetail from '../OrderDetail'
import Employee from '../Employee'


class EmployeeApp extends Component {
  constructor(){
    super(),
    this.state = {
      orders: [],
      manager: false,
      loggedIn: false,
      loginError: '',
      ordersIndex: true,
      newOrder: false,
      detail: false,
      drivers: [],
      employees: []
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
        loggedIn: true,
        ordersIndex: true,
        newOrder: false,
        detail: false
      })
      if(loginResponse.manager){
        this.setState({
          manager: true
        })
      }
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

  register = async (name, username, password, manager) => {
    console.log(manager, 'this is manager in register route')
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
        loggedIn: true,
        ordersIndex: true,
        newOrder: false,
        detail: false
      })
      if(registrationResponse.manager){
        this.setState({
          manager: true
        })
      }
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

  logout = async () => {
    const empLogout = await fetch('http://localhost:9292/emp/logout', {
        method: 'GET'
    });
    const logoutResponse = await empLogout.json();
    this.setState({
      orders: [],
      manager: false,
      loggedIn: false,
      loginError: '',
      ordersIndex: true,
      newOrder: false,
      detail: false,
      drivers: [],
      employees: []
    })
  }
  homeButton = () => {
    this.setState({
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
    this.getDrivers()
    this.getEmployees()

  }
  getDrivers = async () => {
      const allDrivers = await fetch('http://localhost:9292/driver', {
          method: 'GET',
          credentials: 'include'
      })
      const response = await allDrivers.json()
      console.log(response, 'this is allDrivers in getDrivers')
      this.setState({
          drivers: response.drivers
      })
    }

  driversList = () => {
    const drivers = this.state.drivers.map((driver, i) => {
      return(
        <option key={driver.id} value={driver.id}>
          {driver.truck_num}
        </option>
      )
    })
    return drivers
  }
  getEmployees = async () => {
      const employees = await fetch('http://localhost:9292/emp', {
          method: 'GET',
          credentials: 'include'
      })
        const response = await employees.json()
      this.setState({
          employees: response.employees
      })
    }
    
    employeesList = () => {
      console.log(this.state.employees, 'this is employeeeeeeeeeeees')
      const employees = this.state.employees.map((employee, i) => {
        return(
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        )
      })
      return employees
    }

  createOrder = async (title, description, truck, employee) => {
    console.log(employee, 'this is employeeId in createOrder')
    const newOrder = await fetch('http://localhost:9292/orders', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        title: title,
        description: description,
        driver_id: truck,
        employee_id: employee
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

  render() {
    return (
      <div>
        { this.state.loggedIn ?
          <div>
            <EmployeeNavBar logout={this.logout} createNewOrder={this.createNewOrder} homeButton={this.homeButton} manager={this.state.manager}/>
            {this.state.ordersIndex ? <OrdersIndex orders={this.state.orders} detail={this.detail}/>
              : <div>
                {this.state.newOrder ? <EmployeeOrderCreate driversList={this.driversList} employeesList={this.employeesList} manager={this.state.manager} drivers={this.state.drivers} createOrder={this.createOrder}/>
                : <div>
                  {this.state.detail ? <OrderDetail order={this.state.order} empName={this.state.empName}/> : null}
                </div>
                }
              </div>
            }
          </div>
          : <Employee login={this.login} register={this.register}/>
        }
      </div>
    );
  }
}

export default EmployeeApp;