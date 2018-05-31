import React, {Component} from "react";

const EmployeeNavBar = (props) => {

	return(
		props.manager
		? 
		<div className='nav'>
			<button onClick={props.homeButton}>Home</button>
			<button onClick={props.createNewOrder}>Create New Order</button>
			<button>Employees</button>
			<button>Trucks</button>
		</div>
		: 
		<div className='nav'>
			<button onClick={props.homeButton}>Home</button>
			<button>Orders</button>
		</div>
	)
}

export default EmployeeNavBar