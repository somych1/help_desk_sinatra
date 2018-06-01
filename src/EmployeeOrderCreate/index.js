import React, {Component} from "react";

class EmployeeOrderCreate extends Component{
	constructor(){
		super(),
		this.state = {
			title: '',
			description: '',
			truck: '',
			employee: '',
			drivers: [],
			employees: []
		}
	}

	handleInput = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.createOrder(this.state.title, this.state.description, this.state.truck, this.state.employee)
	}

	

	render(){
		console.log(this.state, 'this is state in createOrder')
		const drivers = this.props.driversList()
		const employees = this.props.employeesList()
		return(
			<div>
				<h1>Create New Order</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Truck#</label>
					<select name='truck' onChange={this.handleInput}>
						{drivers}
					</select><br />
					<label>Title</label>
					<input type='text' name='title' value={this.state.title} onChange={this.handleInput}/><br />
					<label>Description</label>
					<input type='text' name='description' value={this.state.description} onChange={this.handleInput}/><br />
					<label>Employee</label>
					<select name='employee' onChange={this.handleInput}>
						{employees}
					</select><br />
					<input type='submit'/>
				</form>
			</div>
		)
	}
}
export default EmployeeOrderCreate