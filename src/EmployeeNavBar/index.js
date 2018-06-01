import React, {Component} from "react";
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class EmployeeNavBar extends Component {
	constructor(props) {
    	super(props);
    	this.toggleNavbar = this.toggleNavbar.bind(this);
    	this.state = {
      		collapsed: true
    	};
  	}

	toggleNavbar() {
    	this.setState({
      		collapsed: !this.state.collapsed
    	});
  	}
  	render() {
		return(
			<div>
				{this.props.manager
					? 
					<Navbar color="light" light>
						<NavbarToggler onClick={this.toggleNavbar}/>
						<Button outline color="primary" onClick={this.props.logout}>Logout</Button>
						<Collapse isOpen={!this.state.collapsed} navbar>
				            <Nav navbar>
				              	<NavItem>
				                	<NavLink onClick={this.props.homeButton}>Home</NavLink>
				              	</NavItem>
				              	<NavItem>
				                	<NavLink onClick={this.props.createNewOrder}>Create New Order</NavLink>
				              	</NavItem>
				              	<NavItem>
				                	<NavLink onClick={this.props.employeesIndex}>Employees</NavLink>
				              	</NavItem>
				            </Nav>
			          	</Collapse>
					</Navbar>
					: 

					<Navbar color="faded" light>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Button outline color="primary" onClick={this.props.logout}>Logout</Button>
						<Collapse isOpen={!this.state.collapsed} navbar>
				            <Nav navbar>
				              	<NavItem>
				                	<NavLink onClick={this.props.homeButton}>Home</NavLink>
				              	</NavItem>
				            </Nav>
			          	</Collapse>
					</Navbar>
				}
			</div>
		)
	}
}

export default EmployeeNavBar

						// <button onClick={props.homeButton}>Home</button>
						// <button onClick={props.createNewOrder}>Create New Order</button>
						// <button onClick={props.employeesIndex}>Employees</button>
						// <button onClick={props.logout}>Logout</button>


					// <Navbar color="faded" light>
					// 	<button onClick={props.homeButton}>Home</button>
					// 	<button onClick={props.logout}>Logout</button>
					// </Navbar>