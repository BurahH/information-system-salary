import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { getDate, getNDS } from '../utils/helpers';
import { getPayments } from '../API/paymentsAPI';
import { useQuery } from '@tanstack/react-query';

const Payments = () => {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');

	const { data, refetch  } = useQuery({
		queryKey: ['payments', year, month],
		queryFn: async () => getPayments(month, year),
		enabled: !!year && !!month,
    retry: 0
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

	const handleYearChange = e => {
		setYear(e.target.value);
	};

	const handleMonthChange = e => {
		setMonth(e.target.value);
	};

	return (
		<Container className="mb-4">
			<Row className="fs-3 fw-bold justify-content-center mb-2">ВЫПЛАТЫ</Row>
			<Row>
				<Form className="d-flex">
					<Form.Select
						aria-label="Year"
						style={{ width: 150 }}
						className="ms-3"
						required
						value={year}
						onChange={handleYearChange}
					>
						<option value={0} hidden>
							Выберете год
						</option>
						<option value={2020}>2020</option>
						<option value={2021}>2021</option>
						<option value={2022}>2022</option>
						<option value={2023}>2023</option>
						<option value={2024}>2024</option>
					</Form.Select>
					<Form.Select
						aria-label="Month"
						style={{ width: 170 }}
						className="ms-3"
						required
						value={month}
						onChange={handleMonthChange}
					>
						<option value={0} hidden>
							Выберете месяц
						</option>
						<option value={1}>Январь</option>
						<option value={2}>Февраль</option>
						<option value={3}>Март</option>
						<option value={4}>Апрель</option>
						<option value={5}>Май</option>
						<option value={6}>Июнь</option>
						<option value={7}>Июль</option>
						<option value={8}>Август</option>
						<option value={9}>Сентябрь</option>
						<option value={10}>Октябрь</option>
						<option value={11}>Ноябрь</option>
						<option value={12}>Декабрь</option>
					</Form.Select>
				</Form>
			</Row>
			{data?.length ? (
				<>
					<Table striped bordered hover className="text-center mt-4">
						<thead>
							<tr className='table-primary'>
								<th>Номер сотрудника</th>
								<th>ФИО</th>
								<th>Зарплата (руб.)</th>
								<th>Надбавки (руб.)</th>
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
								<td colSpan={6} className="text-end">
									Итого:
								</td>
								<td>{final.sum} </td>
								<td>{final.NDS}</td>
								<td className="fw-bold">{final.vidacha}</td>
							</tr>
						</tbody>
					</Table>
					{data && (
						<Row className="d-flex justify-content-end">
							<Button
								style={{ width: 160 }}
								className="me-2"
								variant="outline-success"
								onClick={() => {
									const info = data.map(payment => {
										return {
											Номер_сотрудника: payment.employee.personalNumber,
											ФИО: payment.employee.name,
											Зарплата: payment.employee.salary,
											Надбавки: payment.summaAllowance,
											Дней_болезни: payment.dayDisease,
											Дата_выплаты: getDate(payment.dayPayment),
											Начислено_руб: payment.summaPayment,
											НДС_руб: getNDS(payment.summaPayment, payment.salary),
											К_выдаче_руб:
												payment.summaPayment -
												getNDS(payment.summaPayment, payment.salary),
										};
									});
									info.push({
										Номер_сотрудника: 'Итого:',
										ФИО: '',
										Зарплата: '',
										Надбавки: '',
										Дней_болезни: '',
										Дата_выплаты: '',
										Начислено_руб: final.sum,
										НДС_руб: final.NDS,
										К_выдаче_руб: final.vidacha,
									});

									const ws = XLSX.utils.json_to_sheet(info);
									const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
									const excelBuffer = XLSX.write(wb, {
										bookType: 'xlsx',
										type: 'array',
									});
									const file = new Blob([excelBuffer], {
										type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
									});
									FileSaver.saveAs(file, `Отчет_${year}_${month}.xlsx`);
								}}
							>
								СКАЧАТЬ
							</Button>
						</Row>
					)}
				</>
			) : (
				<Row className='d-flex justify-content-center fs-2 fw-bold mt-5'>Нет информации о данном периоде</Row>
			)}
		</Container>
	);
};

export default Payments;
