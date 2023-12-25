import React, { useState } from 'react';
import {
	Col,
	Container,
	Row,
	Badge,
	Accordion,
	Button,
	Table,
	Card,
	Form,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
	getBonusesByUserId,
	getDiseasesByUserId,
	getUserById,
} from '../API/userAPI';
import { useQuery } from '@tanstack/react-query';
import { getPaymentByUserId } from '../API/paymentsAPI';
import { getDate, getNDS } from '../utils/helpers';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CreateBonus from '../components/modals/CreateBonus';
import CreateDisease from '../components/modals/CreateDisease';
import { MdModeEdit, MdTitle } from 'react-icons/md';
import EditProfile from '../components/modals/EditProfile';

const Profile = () => {
	const { id } = useParams();

	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');
	const [newBonusVisible, setNewBonusVisible] = useState(false);
	const [newDiseaseVisible, setNewDiseaseVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);

	const { data, refetch } = useQuery({
		queryKey: [`user${id}`, id],
		queryFn: async () => getUserById(id),
		enabled: !!id,
	});

	const payment = useQuery({
		queryKey: [`payment${id}`, year, month],
		queryFn: async () => getPaymentByUserId(id, month, year),
		enabled: !!id && !!year && !!month,
	});

	const bonuses = useQuery({
		queryKey: [`bonuses${id}`],
		queryFn: async () => getBonusesByUserId(id),
		enabled: !!id,
	});

	const diseases = useQuery({
		queryKey: [`diseases${id}`],
		queryFn: async () => getDiseasesByUserId(id),
		enabled: !!id,
	});

	const handleYearChange = e => {
		setYear(e.target.value);
	};

	const handleMonthChange = e => {
		setMonth(e.target.value);
	};

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ПРОФИЛЬ</Row>
			{data && (
				<Row className="d-flex">
					<Col>
						<h1>
							{data.name}
							<span title="Редактировать информацию">
								<MdModeEdit
									size={35}
									style={{ marginBottom: 5, marginLeft: 10, cursor: 'pointer' }}
                  onClick={() => setEditVisible(true)}
								/>
							</span>
						</h1>
					</Col>
					<Col className="d-flex">
						<h4 className="ms-auto mt-3">
							<Badge bg="secondary">#{data.id}</Badge>
						</h4>
					</Col>
				</Row>
			)}
			<Row>
				<Card className="p-3 mt-2" style={{ width: 1295, marginLeft: 12 }}>
					{data && (
						<div style={{ display: 'flex', gap: '20px' }} className="fs-6">
							<div>Номер сотрудника: {data.personalNumber}</div>
							<div>Должность: {data.position}</div>
							<div>Зарплата: {data.salary} руб.</div>
							<div>Семейное положение: {data.family}</div>
							<div>Количество детей: {data.children}</div>
							<div>Роль: {data.role || 'Работник'}</div>
						</div>
					)}
				</Card>
			</Row>
			<Row className="mt-4">
				<Col>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Надбавки</Accordion.Header>
							<Accordion.Body>
								<Button
									variant="outline-dark"
									onClick={() => setNewBonusVisible(true)}
								>
									Добавить надбавку
								</Button>
								{bonuses?.data?.length ? (
									<Table striped bordered hover className="text-center mt-4">
										<thead>
											<tr className="table-primary">
												<th>#</th>
												<th>Информация</th>
												<th>Дата</th>
												<th>Сумма (руб.)</th>
											</tr>
										</thead>
										<tbody>
											{bonuses.data.map(bonus => (
												<tr key={bonus.id}>
													<td>{bonus.id}</td>
													<td>{bonus.information}</td>
													<td>{getDate(bonus.date)}</td>
													<td>{bonus.summa}</td>
												</tr>
											))}
										</tbody>
									</Table>
								) : (
									<h2 className="mt-2">Надбавок нет</h2>
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Болезни</Accordion.Header>
							<Accordion.Body>
								<Button
									variant="outline-dark"
									onClick={() => setNewDiseaseVisible(true)}
								>
									Добавить болезнь
								</Button>
								{diseases?.data?.length ? (
									<Table striped bordered hover className="text-center mt-4">
										<thead>
											<tr className="table-primary">
												<th>#</th>
												<th>Информация</th>
												<th>Дата начала</th>
												<th>Дата окончания</th>
											</tr>
										</thead>
										<tbody>
											{diseases.data.map(disease => (
												<tr key={disease.id}>
													<td>{disease.id}</td>
													<td>{disease.information}</td>
													<td>{getDate(disease.dateBegin)}</td>
													<td>{getDate(disease.dateEnd)}</td>
												</tr>
											))}
										</tbody>
									</Table>
								) : (
									<h2 className="mt-2">Болезней нет</h2>
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
			<hr className="mt-4" />
			<Row>
				<h1 className="mt-4">Отчет</h1>
				<Form className="d-flex">
					<Form.Select
						aria-label="Year"
						style={{ width: 150 }}
						className=""
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
			<Row>
				{payment?.data?.length ? (
					<>
						<Table striped bordered hover className="text-center mt-4 ms-2">
							<thead>
								<tr className="table-primary">
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
								{payment.data &&
									payment.data.map(payment => (
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
							</tbody>
						</Table>
						{payment.data && (
							<Row className="d-flex justify-content-end">
								<Button
									style={{ width: 160 }}
									className="mb-3"
									variant="outline-success"
									onClick={() => {
										const info = payment.data.map(payment => {
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

										const ws = XLSX.utils.json_to_sheet(info);
										const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
										const excelBuffer = XLSX.write(wb, {
											bookType: 'xlsx',
											type: 'array',
										});
										const file = new Blob([excelBuffer], {
											type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
										});
										FileSaver.saveAs(
											file,
											`Отчет_Сотрудник_${data.personalNumber}_${year}_${month}.xlsx`
										);
									}}
								>
									СКАЧАТЬ
								</Button>
							</Row>
						)}
					</>
				) : (
					<Row className="d-flex justify-content-center fs-2 fw-bold mt-5 mb-5">
						Нет информации о данном периоде
					</Row>
				)}
			</Row>
			<CreateBonus
				show={newBonusVisible}
				onHide={() => setNewBonusVisible(false)}
				id={id}
				refetch={() => bonuses.refetch()}
			/>
			<CreateDisease
				show={newDiseaseVisible}
				onHide={() => setNewDiseaseVisible(false)}
				id={id}
				refetch={() => diseases.refetch()}
			/>
			<EditProfile
				show={editVisible}
				onHide={() => setEditVisible(false)}
				refetch={refetch}
        initInfo={data}
			/>
		</Container>
	);
};

export default Profile;
