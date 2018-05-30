import React, {Component} from "react";

const DriverNavigationBar = (props) => {

	return(
		<div>
			<div>
				<button>Home</button>
			</div>
			<div>
				<button onClick={props.createNewOrder}>Create New Order</button>
			</div>
			<div>
			</div>
			<div>
			</div>
		</div>
	)
}

export default DriverNavigationBar