import React, {Component} from 'react' 
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class EmployeeOrderDetail extends Component {
	render(){
		return(
			<Card>
		        <CardBody onClick={this.props.openEditOrder}>
		            <CardTitle>ORDER #{this.props.order.id}</CardTitle>
		            <CardSubtitle>Truck Number: {this.props.truckNum}</CardSubtitle>
		            <CardText>STATUS: {this.props.order.completed ? 'Completed' : 'In Progress'}</CardText>
		        </CardBody>
		        <CardBody onClick={this.props.openEditOrder}>
		            <CardText>TITLE: {this.props.order.title}</CardText>
		            <CardText>DESCRIPTION: {this.props.order.description}</CardText>
		            <CardText>Employee: {this.props.empName}</CardText>
		            <CardText>COMMENT: {this.props.order.comment}</CardText>
		        </CardBody>
		        {this.props.manager ?
		    		<Button id={this.props.order.id} onClick={this.props.deleteOrder}>Delete</Button>
		    		:
		    		null
		    	}
		    </Card>
		)
	}
}

export default EmployeeOrderDetail