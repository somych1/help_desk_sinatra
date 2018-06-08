import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class OrderEdit extends Component{
	constructor(props){
		super(props);
		this.state ={
			id: '',
			title: '',
			description: '',
			status: false,
			employee: '',
			comment: '',
			truckNumber: '',
			employeeName: '',
			driver: ''
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			id: nextProps.order.id,
			title: nextProps.order.title,
			status: nextProps.order.completed,
			description: nextProps.order.description,
			employee: nextProps.order.employee_id,
			comment: nextProps.order.comment,
			driver: nextProps.order.driver_id
		})
		this.getTruck()
		if(!nextProps.manager){
			this.getEmployee()
		}
	}

	handleInput = (e) => {
		const field = e.currentTarget.name
		if (field == 'employee') {
			this.setState({ employee: e.currentTarget.value })
		} else if (field == 'description') {
			this.setState({ description: e.currentTarget.value })
		} else if (field == 'comment') {
			this.setState({ comment: e.currentTarget.value })
		} else if(field == 'status') {
			this.setState({ status: e.target.checked })
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.props.manager){
			this.props.editedOrderByManager(this.state.description, this.state.status, this.state.employee, this.state.comment, this.state.id)
		} else {
			this.props.editedOrderByEmpl(this.state.status, this.state.comment, this.state.id)
		}
	}

	getTruck = async () => {
	    const aDriver = await fetch('http://localhost:9292/driver/' + this.props.order.driver_id, {
	        method: 'GET',
	        credentials: 'include'
	    })
	    const response = await aDriver.json()
	    this.setState({
	        truckNumber: response.truck
	    })
	}

  	getEmployee = async () => {
		const employee = await fetch('http://localhost:9292/emp/' + this.props.order.employee_id, {
        	method: 'GET',
	    	credentials: 'include'
    	})
    	const response = await employee.json()
    	this.setState({
        	employeeName: response.employee.name
    	})
	}

	render(){
		if(this.props.manager){
			const employees = this.props.employeesList()
			return(
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>Truck Number</Label>
						<h5>{this.state.truckNumber}</h5>
					</FormGroup>
					<FormGroup>
						<Label>Title</Label>
						<h5>{this.state.title}</h5>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input type='textarea' name='description' value={this.state.description} onChange={this.handleInput}/>
					</FormGroup>
					<FormGroup check>
						<Label>
							<Input name="status" type="checkbox" checked={this.state.status} onChange={this.handleInput}/>
	    					Completed
						</Label>
					</FormGroup>
					<FormGroup>
						<Label>Employee</Label>
						<Input type="select" name='employee'  onChange={this.handleInput}>
				        	{employees}
				        </Input>
			        </FormGroup>
			        <FormGroup>
						<Label>Comment</Label>
						<Input type='textarea' name='comment' value={this.state.comment} onChange={this.handleInput}/>
					</FormGroup>
					<Button outline color="primary">Submit</Button>
					{this.props.editError != '' ? <p>{this.props.editError}</p> : null}
				</Form>
			)
		} else {
			return(
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label>Truck Number</Label>
						<h5>{this.state.truckNumber}</h5>
					</FormGroup>
					<FormGroup>
						<Label>Title</Label>
						<h5>{this.state.title}</h5>
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<h5>{this.state.description}</h5>
					</FormGroup>
					<FormGroup check>
						<Label>
							<Input name="status" type="checkbox" checked={this.state.status} onChange={this.handleInput}/>
	    					Completed
						</Label>
					</FormGroup>
					<FormGroup>
						<Label>Employee</Label>
						<h5>{this.state.employeeName}</h5>
			        </FormGroup>
			        <FormGroup>
						<Label>Comment</Label>
						<Input type='textarea' name='comment' value={this.state.comment} onChange={this.handleInput}/>
					</FormGroup>
					<Button outline color="primary">Submit</Button>
				</Form>
			)
		}
	}
}

export default OrderEdit;