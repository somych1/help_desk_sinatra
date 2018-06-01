import React from "react"
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const OrdersIndex = (props) => {
	const orders = props.orders
	const ordersList = orders.map((order, i) => {
		return(
			<Card key={order.id}  id={order.id} onClick={props.orderDetail}>
        		<CardBody>
		          	<CardTitle>{order.title}</CardTitle>
		          	<CardSubtitle>Status: {order.completed ? 'Complete' : 'In Progress'}</CardSubtitle>
		        </CardBody>
		    </Card>
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