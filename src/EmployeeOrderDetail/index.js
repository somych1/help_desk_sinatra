import React, {Component} from 'react' 

class EmployeeOrderDetail extends Component {
	render(){
		return(
			<div>
				<h1>ORDER #{this.props.order.id}</h1>
				<h3>TITLE: {this.props.order.title}</h3>
				<h3>DESCRIPTION: {this.props.order.description}</h3>
				<h3>STATUS: {this.props.order.completed ? 'Completed' : 'In Progress'}</h3>
				<h3>EMPLOYEE: {this.props.empName}</h3>
				<h3>COMMENT: {this.props.order.comment}</h3>
			</div>
		)
	}
}

export default EmployeeOrderDetail