import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const Payments = () => {
	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ВЫПЛАТЫ</Row>
			<Table striped bordered hover className='text-center mt-4'>
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
