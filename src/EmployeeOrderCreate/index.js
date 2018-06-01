import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
				

				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
			          	<Label>Select Truck Number</Label>
			          	<Input type="select"  name='truck' onChange={this.handleInput}>
			            	{drivers}
			          	</Input>
			        </FormGroup>
					<FormGroup>
				        <Label>Title</Label>
				        <Input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup>
				        <Label>Description</Label>
				        <Input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup>
			          	<Label>Select Employee</Label>
			          	<Input type="select" name='employee' onChange={this.handleInput}>
			            	{employees}
			          	</Input>
			        </FormGroup>
			        <Button outline color="primary">Submit</Button>
				</Form>
			</div>
		)
	}
}
export default EmployeeOrderCreate
// <form onSubmit={this.handleSubmit}>
// 					<label>Truck#</label>
// 					<select name='truck' onChange={this.handleInput}>
// 						{drivers}
// 					</select><br />
// 					<label>Title</label>
// 					<input type='text' name='title' value={this.state.title} onChange={this.handleInput}/><br />
// 					<label>Description</label>
// 					<input type='text' name='description' value={this.state.description} onChange={this.handleInput}/><br />
// 					<label>Employee</label>
// 					<select name='employee' onChange={this.handleInput}>
// 						{employees}
// 					</select><br />
// 					<input type='submit'/>
// 				</form>