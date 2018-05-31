import React, {Component} from "react";

class CreateOrder extends Component{
	constructor(){
		super(),
		this.state = {
			title: '',
			description: '',
			truck: '',
			employee: ''
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

	driversList = () => {
		const drivers = this.props.drivers.map((driver, i) => {
			return(
				<option key={driver.id} value={driver.id}>
					{driver.truck_num}
				</option>
			)
		})
		return drivers
	}

	render(){
		console.log(this.state, 'this is state in createOrder')

		const drivers = this.driversList()
		const employees = this.props.employeesList()
		return(
			<div>
				<h1>Create New Order</h1>
				{this.props.manager ?
					<form onSubmit={this.handleSubmit}>
						<label>Truck#</label>
						<select name='truck' onChange={this.handleInput}>
							{drivers}
						</select><br />
						<label>Title</label>
						<input type='text' name='title' value={this.state.title} onChange={this.handleInput}/><br />
						<label>Description</label>
						<input ttpe='text' name='description' value={this.state.description} onChange={this.handleInput}/><br />
						<label name='employee' onChange={this.handleInput}>Employee</label>
						<select name='employee' onChange={this.handleInput}>
							{employees}
						</select><br />
						


						<input type='submit'/>
					</form>
					: <form onSubmit={this.handleSubmit}>
						<label>Title</label>
						<input type='text' name='title' value={this.state.title} onChange={this.handleInput}/>
						<label>Description</label>
						<input ttpe='text' name='description' value={this.state.description} onChange={this.handleInput}/>
						<input type='submit'/>
					</form>
				}
			</div>
		)
	}
}
export default CreateOrder