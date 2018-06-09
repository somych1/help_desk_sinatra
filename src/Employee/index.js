import React, {Component} from "react";
import './style.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Employee extends Component{
	constructor(){
		super();
		this.state = {
			name: '',
			username: '',
			password: '',
			manager: false,
			registering: false
		}
	}
	registration = () => {
		this.setState({
			registering: true
		})
	}
	login = () => {
		this.setState({
			registering: false
		})
	}
	handleInput = (e) => {
		
		const field = e.currentTarget.name

		if(field == 'name') {
			this.setState({ name: e.currentTarget.value })
		} else if (field == 'username') {
			this.setState({ username: e.currentTarget.value })
		} else if (field == 'password') {
			this.setState({ password: e.currentTarget.value })
		} else if (field == 'manager') {
			this.setState({
				manager: e.target.checked
			})
		}

	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.registering) this.props.register(this.state.name, this.state.username, this.state.password, this.state.manager)
		else this.props.login(this.state.username, this.state.password)
	}
	render(){
		return(
			<div>
				<Button outline color="primary" className={this.state.registering ? "current" : null} className="button" onClick={this.registration}>Registration</Button> <Button outline color="primary" className={this.state.registering ? null : "current"} className="button" onClick={this.login}>Login</Button><br />
				<Form onSubmit={this.handleSubmit}>
					<FormGroup className={this.state.registering ? null : 'hide'}>
				        <Label>Name</Label>
				        <Input type='text' name='name' placeholder='name' value={this.state.name} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup>
				        <Label>Username</Label>
				        <Input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup>
			          	<Label>Password</Label>
			          	<Input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleInput}/>
			        </FormGroup>
			        <FormGroup check>
			          	<Label check  className={this.state.registering ? null : 'hide'}>
			            	<Input name="manager"
           						type="checkbox"
           						checked={this.state.manager}
            					onChange={this.handleInput} 
            				/> Manager
			          	</Label>
			        </FormGroup>
			        <Button outline color="primary">Submit</Button>
				</Form>
				{this.props.loginError != '' ? <p>{this.props.loginError}</p> : null}
			</div>
		)
	}
}

export default Employee