import React, {Component} from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class DriverNavigationBar extends Component {
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
				<Navbar color="faded" light>
					<NavbarToggler onClick={this.toggleNavbar}/>
					<Collapse isOpen={!this.state.collapsed} navbar>
			            <Nav navbar>
			              	<NavItem>
			                	<NavLink onClick={this.props.homeButton}>Home</NavLink>
			              	</NavItem>
			              	<NavItem>
			                	<NavLink onClick={this.props.createNewOrder}>Create New Order</NavLink>
			              	</NavItem>
			              	<NavItem>
			                	<NavLink onClick={this.props.logout}>Logout</NavLink>
			              	</NavItem>
			            </Nav>
		          	</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default DriverNavigationBar