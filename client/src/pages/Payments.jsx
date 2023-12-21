import React from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const Payments = () => {
	return (
		<Container>
			<Table striped bordered hover className='text-center'>
				<thead>
					<tr>
						<th>#</th>
						<th>ФИО</th>
						<th>Оклад</th>
						<th>Надбавки</th>
						<th>Дни болезни</th>
						<th>Дата выплаты</th>
						<th>Итоговая сумма</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Markфффффффффффффф</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
};

export default Payments;
