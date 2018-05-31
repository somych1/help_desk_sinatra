import React, {Component} from "react";

const EmployeeNavBar = (props) => {

	return(
		<div className='nav'>
			<button onClick={props.homeButton}>Home</button>
			<button onClick={props.createNewOrder}>Create New Order</button>
			<button>Employees</button>
			<button>Trucks</button>
		</div>
	)
}

export default EmployeeNavBar