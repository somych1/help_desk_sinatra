import React, {Component} from 'react' 
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

class EmployeeOrderDetail extends Component {
	render(){
		return(
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
		)
	}
}

export default EmployeeOrderDetail
			// <div>
			// 	<h1>ORDER #{this.props.order.id}</h1>
			// 	<h3>TITLE: {this.props.order.title}</h3>
			// 	<h3>DESCRIPTION: {this.props.order.description}</h3>
			// 	<h3>STATUS: {this.props.order.completed ? 'Completed' : 'In Progress'}</h3>
			// 	<h3>EMPLOYEE: {this.props.empName}</h3>
			// 	<h3>COMMENT: {this.props.order.comment}</h3>
			// </div>