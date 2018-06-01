import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const EmployeesIndex = (props) => {
	const empList = props.employees.map((employee, i) => {
		return(
			<Card key={employee.id} id={employee.id} onClick={props.employeeOrders}>
        		<CardBody>
		          	<CardTitle>{employee.name}</CardTitle>
		        </CardBody>
		    </Card>
		)
	})
	return(
		<div>
		<h1>Employees</h1>
			{empList}
		</div>
	)
}

export default EmployeesIndex