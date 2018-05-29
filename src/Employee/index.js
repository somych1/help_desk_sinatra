import React, {Component} from "react";
import './style.css'

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
			registering: true,
			manager: false
		})
	}
	login = () => {
		this.setState({
			registering: false
		})
	}
	handleInput = (e) => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({ manager: value})
		const field = e.currentTarget.name
		if(field == 'name') this.setState({ name: e.currentTarget.value })
		else if (field == 'username') this.setState({ username: e.currentTarget.value })
		else if (field == 'password') this.setState({ password: e.currentTarget.value });

		// console.log(this.state.manager, 'this is manager')
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.registering) this.props.register(this.state.name, this.state.username, this.state.password, this.state.manager)
		else this.props.login(this.state.username, this.state.password)
	}
	render(){
		console.log(this.state.manager, 'this is manager')
		return(
			<div>
				<button className={this.state.registering ? "current" : null} className="button" onClick={this.registration}>Create new user</button>
				<button className={this.state.registering ? null : "current"} className="button" onClick={this.login}>Login</button>
				<form onSubmit={this.handleSubmit}>
					<input className={this.state.registering ? null : 'hide'} type='text' name='name' placeholder='name' value={this.state.name} onChange={this.handleInput}/><br />
					<input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleInput}/><br />
					<input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleInput}/><br />
					<p className={this.state.registering ? null : 'hide'}>Manager
					<input
            			name="manager"
           				type="checkbox"
           				checked={this.state.isGoing}
            			onChange={this.handleInput} /></p><br />
					<button className="button button-primary" type='submit'>Submit</button>
				</form>
				{this.props.loginError != '' ? <p>{this.props.loginError}</p> : null}
			</div>
		)
	}
}

export default Employee