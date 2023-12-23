import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { paymentsData } from '../data/payments';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import { $API } from '../API';
import { getDate, getNDS } from '../utils/helpers';
import { getPayments } from '../API/userAPI';
import { useQuery } from '@tanstack/react-query';

const Payments = () => {
	const { data } = useQuery({
		queryKey: ['payments'],
		queryFn: async () => getPayments(11, 2023),
	});

	const [final, setFinal] = useState({ sum: 0, NDS: 0, vidacha: 0 });

	useEffect(() => {
		if (data) {
			const sum = data.reduce(
				(acum, payment) => acum + payment.summaPayment,
				0
			);
			const NDS = data.reduce(
				(acum, payment) => acum + getNDS(payment.summaPayment, payment.salary),
				0
			);
			const vidacha = data.reduce(
				(acum, payment) =>
					acum +
					payment.summaPayment -
					getNDS(payment.summaPayment, payment.salary),
				0
			);

			setFinal({ sum, NDS, vidacha });
		}
	}, [data]);

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ВЫПЛАТЫ</Row>
			<Table striped bordered hover className="text-center mt-4">
				<thead>
					<tr>
						<th>Номер сотрудника</th>
						<th>ФИО</th>
						<th>Зарплата</th>
						<th>Надбавки</th>
						<th>Дней болезни</th>
						<th>Дата выплаты</th>
						<th>Начислено (руб.)</th>
						<th>НДС (руб.)</th>
						<th>К выдаче (руб.)</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map(payment => (
							<tr key={payment.id}>
								<td>{payment.employee.personalNumber}</td>
								<td>{payment.employee.name}</td>
								<td>{payment.salary}</td>
								<td>{payment.summaAllowance}</td>
								<td>{payment.dayDisease}</td>
								<td>{getDate(payment.dayPayment)}</td>
								<td>{payment.summaPayment}</td>
								<td>{getNDS(payment.summaPayment, payment.salary)}</td>
								<td className="fw-bold">
									{payment.summaPayment -
										getNDS(payment.summaPayment, payment.salary)}
								</td>
							</tr>
						))}
					<tr>
						<td colSpan={6}></td>
						<td>Итого: {final.sum} </td>
						<td>Итого: {final.NDS}</td>
						<td className="fw-bold">Итого: {final.vidacha}</td>
					</tr>
				</tbody>
			</Table>
			<Row className="d-flex justify-content-end">
				<div className="ms-auto">
					<Button
						variant="outline-success"
						onClick={() => {
							// const ws = XLSX.utils.json_to_sheet(payments);
							// const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
							// const excelBuffer = XLSX.write(wb, {
							// 	bookType: 'xlsx',
							// 	type: 'array',
							// });
							// const file = new Blob([excelBuffer], {
							// 	type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
							// });
							// FileSaver.saveAs(file, 'example.xlsx');
						}}
					>
						СКАЧАТЬ
					</Button>
				</div>
			</Row>
		</Container>
	);
};

export default Payments;
