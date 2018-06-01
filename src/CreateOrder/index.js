import React, {Component} from "react";

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
				<form onSubmit={this.handleSubmit}>
					<label>Title</label>
					<input type='text' name='title' value={this.state.title} onChange={this.handleInput}/>
					<label>Description</label>
					<input ttpe='text' name='description' value={this.state.description} onChange={this.handleInput}/>
					<input type='submit'/>
				</form>
			</div>
		)
	}
}
export default CreateOrder