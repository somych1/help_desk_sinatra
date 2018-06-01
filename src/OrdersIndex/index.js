import React from "react"

const OrdersIndex = (props) => {
	const orders = props.orders
	const ordersList = orders.map((order, i) => {
		return(
			<div key={order.id}  id={order.id} onClick={props.orderDetail}>
				<h3>{order.title}</h3>
				<h4>Status: {order.completed ? 'Complete' : 'In Progress'}</h4>
			</div>
		)
	})
	return(
		<div>
		<h1>{props.orders.length} Orders</h1>
			{ordersList}
		</div>
	)
}

export default OrdersIndex