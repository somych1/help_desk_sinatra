import React, {Component} from 'react'

const EmployeesIndex = (props) => {
	const empList = props.employees.map((employee, i) => {
		return(
			<div key={employee.id}>
				<h3>{employee.name}</h3>
			</div>
		)
	})
	return(
		<div>
			{empList}
		</div>
	)
}

export default EmployeesIndex