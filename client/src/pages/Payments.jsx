import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { paymentsData } from '../data/payments';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Payments = () => {
	const [payments, setPayments] = useState(paymentsData);
	const [final, setFinal] = useState(
		paymentsData.reduce((acc, item) => acc + item.payment, 0)
	);

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ВЫПЛАТЫ</Row>
			<Table striped bordered hover className="text-center mt-4">
				<thead>
					<tr>
						<th>#</th>
						<th>Пользователь #</th>
						<th>Оклад</th>
						<th>Сумма надбавок</th>
						<th>Дни болезни</th>
						<th>Дата выплаты</th>
						<th>Итоговая сумма</th>
					</tr>
				</thead>
				<tbody>
					{payments.map(payment => (
						<tr key={payment.id}>
							<td>{payment.id}</td>
							<td>{payment.user_id}</td>
							<td>{payment.user_salary}</td>
							<td>{payment.bonus_sum}</td>
							<td>{payment.illness_days}</td>
							<td>{payment.payment_date}</td>
							<td>{payment.payment}</td>
						</tr>
					))}

					<Row>Итог: {final} </Row>

					<button
						onClick={() => {
							const ws = XLSX.utils.json_to_sheet(payments);
							const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
							const excelBuffer = XLSX.write(wb, {
								bookType: 'xlsx',
								type: 'array',
							});
							const file = new Blob([excelBuffer], {
								type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
							});
							FileSaver.saveAs(file, 'example.xlsx');
						}}
					>
						СКАЧАТЬ
					</button>
				</tbody>
			</Table>
		</Container>
	);
};

export default Payments;
