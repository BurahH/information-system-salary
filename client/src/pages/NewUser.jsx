import React, { useState } from 'react';
import { Card, Container, Form, Row, Button, Col } from 'react-bootstrap';

const initInfo = {
	personalNumber: '',
	name: '',
	position: '',
	salary: '',
	family: '',
	children: 0,
};

const NewUser = () => {
	const [userInfo, setUserInfo] = useState(initInfo);
	const [isUser, setIsUser] = useState(false);

	const createUser = () => {
		alert('BIP');
	};

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center mb-4">
				ДОБАВЛЕНИЕ РАБОТНИКА
			</Row>
			<Card className="p-4 mb-5">
				<Row>
					<Col xs={6}>
						<Form>
							<h2>Информация</h2>
							<hr />
							<Form.Group className="mb-3" controlId="personalNumber">
								<Form.Label className="fw-bold">Номер сотрудника</Form.Label>
								<Form.Control placeholder="Введите номер сотрудника..." />
							</Form.Group>

							<Form.Group className="mb-3" controlId="nameUser">
								<Form.Label className="fw-bold">ФИО</Form.Label>
								<Form.Control placeholder="Введите имя сотрудника..." />
							</Form.Group>

							<Form.Group className="mb-3" controlId="positionUser">
								<Form.Label className="fw-bold">Должность</Form.Label>
								<Form.Control placeholder="Введите должность сотрудника..." />
							</Form.Group>

							<Form.Group className="mb-3" controlId="salaryUser">
								<Form.Label className="fw-bold">Зарплата</Form.Label>
								<Form.Control
									type="number"
									placeholder="Введите зарплату сотрудника..."
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="familyUser">
								<Form.Label className="fw-bold">Семейное положение</Form.Label>
								<Form.Control placeholder="Введите семейное положение сотрудника..." />
							</Form.Group>
							<Form.Group className="mb-3" controlId="childreUser">
								<Form.Label className="fw-bold">Количество детей</Form.Label>
								<Form.Control
									type="number"
									placeholder="Введите количество детей сотрудника..."
								/>
							</Form.Group>
						</Form>
					</Col>
					<Col xs={6}>
						<Form>
							<h2>Учетная запись</h2>
							<hr />

							<Form.Group className="mb-3" controlId="family">
								<Form.Label className="fw-bold">Логин</Form.Label>
								<Form.Control
									disabled={!isUser}
									placeholder="Введите логин..."
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="family">
								<Form.Label className="fw-bold">Пароль</Form.Label>
								<Form.Control
									disabled={!isUser}
									placeholder="Введите пароль..."
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="family">
								<Form.Label className="fw-bold">Роль</Form.Label>

								<Form.Select
									className="mb-3"
									aria-label="Default select example"
									disabled={!isUser}
								>
									<option value={0} hidden>
										Выберете роль
									</option>
									<option value={'user'}>Бухгалтер</option>
									<option value={'admin'}>Администратор</option>
								</Form.Select>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Label className="fw-bold">
									Добавление учетной записи
								</Form.Label>

								<Form.Check
									type="checkbox"
									label="Сотруднику необходима учетная запись"
									onChange={() => setIsUser(prev => !prev)}
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Button
					variant="outline-primary"
					className="mt-3"
					type="submit"
					style={{ margin: '0 auto', width: 300 }}
				>
					Создать сотрудника
				</Button>
			</Card>
		</Container>
	);
};

export default NewUser;
