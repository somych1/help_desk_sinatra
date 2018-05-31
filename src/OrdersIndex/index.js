import React from "react"

const OrdersIndex = (props) => {
	const orders = props.orders
	const ordersList = orders.map((order, i) => {
		return(
			<div key={order.id}>
				<h3>{order.title}</h3>
				<h3>{order.completed}</h3>
				<button id={order.id} onClick={props.detail}>Detail</button>
			</div>
		)
	})
	return(
		<div>
			{ordersList}
		</div>
	)
}

export default OrdersIndex