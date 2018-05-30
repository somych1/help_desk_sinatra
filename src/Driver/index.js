import React, {Component} from "react";
import './style.css'

class Driver extends Component{
	constructor(){
		super();
		this.state = {
			name: '',
			username: '',
			password: '',
			truck: '',
			make: '',
			model: '',
			year: '',
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
		if(field == 'name') this.setState({ name: e.currentTarget.value })
		else if (field == 'username') this.setState({ username: e.currentTarget.value })
		else if (field == 'password') this.setState({ password: e.currentTarget.value });
		else if (field == 'truck') this.setState({ truck: e.currentTarget.value });
		else if (field == 'make') this.setState({ make: e.currentTarget.value });
		else if (field == 'model') this.setState({ model: e.currentTarget.value });
		else if (field == 'year') this.setState({ year: e.currentTarget.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.registering) this.props.register(this.state.name, this.state.username, this.state.password, this.state.truck, this.state.make, this.state.model, this.state.year)
		else this.props.login(this.state.username, this.state.password)
	}

	render(){
		return(
			<div>
				<button className={this.state.registering ? "current" : null} className="button" onClick={this.registration}>Create new user</button>
				<button className={this.state.registering ? null : "current"} className="button" onClick={this.login}>Login</button>
				<form onSubmit={this.handleSubmit}>
					<input className={this.state.registering ? null : 'hide'} type='text' name='name' placeholder='name' value={this.state.name} onChange={this.handleInput}/><br />
					<input type='text' name='username' placeholder='username' value={this.state.username} onChange={this.handleInput}/><br />
					<input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleInput}/><br />
					<input className={this.state.registering ? null : 'hide'}  type='text' name='truck' placeholder='truck' value={this.state.truck} onChange={this.handleInput}/><br />
					<input className={this.state.registering ? null : 'hide'}  type='text' name='make' placeholder='make' value={this.state.make} onChange={this.handleInput}/><br />
					<input className={this.state.registering ? null : 'hide'}  type='text' name='model' placeholder='model' value={this.state.model} onChange={this.handleInput}/><br />
					<input className={this.state.registering ? null : 'hide'}  type='text' name='year' placeholder='year' value={this.state.year} onChange={this.handleInput}/><br />
					<button className="button button-primary" type='submit'>Submit</button>
				</form>
				{this.props.loginError != '' ? <p>{this.props.loginError}</p> : null}
			</div>
		)
	}
}

export default Driver