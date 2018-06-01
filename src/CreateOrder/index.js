import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateOrder extends Component{
	constructor(){
		super(),
		this.state = {
			title: '',
			description: ''
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
		return(
			<div>
				<h1>Create New Order</h1>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
				        <Label>Title</Label>
				        <Input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup>
				        <Label>Description</Label>
				        <Input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleInput}/>
			        </FormGroup>
					<input type='submit'/>
				</Form>
			</div>
		)
	}
}
export default CreateOrder