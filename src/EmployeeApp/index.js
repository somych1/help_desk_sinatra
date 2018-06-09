import React, {Component} from "react";
import EmployeeNavBar from '../EmployeeNavBar'
import EmployeeOrderCreate from '../EmployeeOrderCreate'
import OrdersIndex from '../OrdersIndex'
import EmployeeOrderDetail from '../EmployeeOrderDetail'
import Employee from '../Employee'
import EmployeesIndex from '../EmployeesIndex'
import OrderEdit from '../OrderEdit'


class EmployeeApp extends Component {
  constructor(){
    super(),
    this.state = {
      truckNum: '',
      order: [],
      title: [],
      empName: '',
      truck: '',
      orders: [],
      editError: '',
      manager: false,
      loggedIn: false,
      loginError: '',
      drivers: [],
      employees: [],
      ordersIndex: true,
      newOrder: false,
      detail: false,
      employeesIndex: false,
      orderToEdit: false
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
    // console.log(loginResponse, 'this is loginResponse')
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
      employees: [],
      employeesIndex: false
    })
  }

  homeButton = () => {
    this.getOrders()
      .then((orders) => {
        this.setState({orders: orders.order})
      })
      .catch((err) => {
        console.log(err);
      })
    this.setState({
      ordersIndex: true,
      newOrder: false,
      detail: false,
      employeesIndex: false,
      employeeDetail: false
    })
  }

  getOrders = async () => {
    const allOrders = await fetch('http://localhost:9292/orders', {
      method: 'GET',
      credentials: 'include'
    })
    const orders = await allOrders.json()
    // console.log(orders, 'this is response in getOrders')
    return orders
  }

  createNewOrder = () => {
    this.state.newOrder ? this.homeButton() : this.setState({ordersIndex: false})
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
    console.log(this.state.employees, 'this is employeeeeeeeeeeees in getEmployees')
  }
    
  employeesList = () => {
    console.log(this.state.employees, 'this is employeeeeeeeeeeees in employeesList')
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
        completed: false,
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

  employeesIndex = () => {
    this.getEmployees()
    this.state.employeesIndex ? this.homeButton() : this.setState({
      ordersIndex: false,
      newOrder: false,
      detail: false
    })
    this.setState({
      employeesIndex: !this.state.employeesIndex
    })
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
      title: response.order.title,
      detail: true,
      ordersIndex: false,
      newOrder: false,
      employeesIndex: false
    })
    const employeeId = response.order.employee_id
    const truckId = response.order.driver_id
    if (response.success && employeeId) {
      const employee = await fetch('http://localhost:9292/emp/' + employeeId, {
        method: 'GET',
        credentials: 'include'
      })
      const empResponse = await employee.json()
      // console.log(empResponse, ' this is empResponse in orderDetail')
      if (empResponse.success){
        this.setState({
          empName: empResponse.employee.name
        })
      } 
    }
    console.log(truckId, 'this is truckId in orderDetail')
    if (response.success && truckId){
      const driver = await fetch('http://localhost:9292/driver/' + truckId, {
          method: 'GET',
          credentials: 'include'
      })
      const driverResponse = await driver.json()
      console.log(driverResponse, 'this is driverResponse in orderDetail')
      if (driverResponse.success){
        this.setState({
            truckNum: driverResponse.truck
        })
      }
    }
  }

  employeeOrders = async (e) => {
    const id = e.currentTarget.id
    // console.log(id, 'this is id in employeeOrders')
    const orders = await fetch('http://localhost:9292/orders/employee/' + id, {
      method: "GET",
      credentials: 'include'
    })
    const response = await orders.json()
    this.setState({
      orders: response.orders,
      ordersIndex: true,
      newOrder: false,
      detail: false,
      employeesIndex: false
    })
  }

  openEditOrder = () => {
    // console.log('this is editOrder function in EmployeeApp')
    this.setState({
      orderToEdit: true,
      ordersIndex: false,
      newOrder: false,
      detail: false,
      employeesIndex: false
    })
    this.getEmployees()
  }

  editedOrderByManager = async (description, status, employee, comment, id) => {
    const order = await fetch('http://localhost:9292/orders/' + id, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        description: description,
        completed: status,
        employee_id: employee,
        comment: comment
      })
    })
    const response = await order.json()
    if(response.success){
      this.homeButton()
      this.setState({
        editError: ''
      })
    } else {
      this.setState({
        editError: response.message
      })
    }
  }

  editedOrderByEmpl = async (status, comment, id) => {
    const order = await fetch('http://localhost:9292/orders/' + id, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        completed: status,
        comment: comment
      })
    })
    const response = await order.json()
    console.log(response, 'this is response in editedOrderByManager')
    this.homeButton()
  }

  deleteOrder = async (e) => {
    const id = e.currentTarget.id
    const order =  await fetch('http://localhost:9292/orders/' + id, {
      method: "DELETE",
      credentials: 'include'
    })
    this.homeButton()
  }

  render() {
    return (
      <div>
        { this.state.loggedIn ?
          <div>
            <EmployeeNavBar logout={this.logout} createNewOrder={this.createNewOrder} homeButton={this.homeButton} manager={this.state.manager} employeesIndex={this.employeesIndex}/>
            {this.state.ordersIndex ? <OrdersIndex orders={this.state.orders} orderDetail={this.orderDetail}/>
              : <div>
                {this.state.newOrder ? <EmployeeOrderCreate driversList={this.driversList} employeesList={this.employeesList} manager={this.state.manager} drivers={this.state.drivers} createOrder={this.createOrder}/>
                : <div>
                  {this.state.detail ? <EmployeeOrderDetail manager={this.state.manager} deleteOrder={this.deleteOrder} order={this.state.order} truckNum={this.state.truckNum} empName={this.state.empName} openEditOrder={this.openEditOrder} />
                  : <div>
                    {this.state.employeesIndex ? <EmployeesIndex employees={this.state.employees} employeeOrders={this.employeeOrders}/>
                    : <div>
                      {this.state.orderToEdit ? <OrderEdit editError={this.state.editError} employeesList={this.employeesList} order={this.state.order} editedOrderByManager={this.editedOrderByManager} editedOrderByEmpl={this.editedOrderByEmpl} manager={this.state.manager}/> : null}
                    </div>
                  }
                  </div>
                }
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