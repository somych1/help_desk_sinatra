import React, {Component} from 'react'

const EmployeesIndex = (props) => {
	const empList = props.employees.map((employee, i) => {
		return(
			<div key={employee.id} onClick={props.employeeOrders}>
				<h3 id={employee.id}>{employee.name}</h3>
			</div>
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