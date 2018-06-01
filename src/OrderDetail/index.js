import React, {Component} from "react"
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

class OrderDetail extends Component {
	render(){
		return(
			<div>
				<Card>
			        <CardBody>
			            <CardTitle>ORDER #{this.props.order.id}</CardTitle>
			            <CardSubtitle>TITLE: {this.props.order.title}</CardSubtitle>
			        </CardBody>
			        <CardBody>
			            <CardText>DESCRIPTION: {this.props.order.description}</CardText>
			            <CardText>STATUS: {this.props.order.completed ? 'Completed' : 'In Progress'}</CardText>
			            <CardText>COMMENT: {this.props.order.comment}</CardText>
			        </CardBody>
			    </Card>
			</div>
		)
	}
}

export default OrderDetail