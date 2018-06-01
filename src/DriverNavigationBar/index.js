import React, {Component} from "react";

const DriverNavigationBar = (props) => {

	return(
		<div className='nav'>
			<button onClick={props.homeButton}>Home</button>
			<button onClick={props.createNewOrder}>Create New Order</button>
			<button onClick={props.logout}>Logout</button>
		</div>
	)
}

export default DriverNavigationBar