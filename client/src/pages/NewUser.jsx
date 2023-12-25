import React, { useState } from 'react';
import { Card, Container, Form, Row, Button, Col } from 'react-bootstrap';
import { createNewEmployee, createNewUser } from '../API/userAPI';

const initInfo = {
	personalNumber: '',
	name: '',
	position: '',
	salary: '',
	family: '',
	children: 0,
	login: '',
	password: '',
	roles: '',
};

const NewUser = () => {
	const [userInfo, setUserInfo] = useState(initInfo);
	const [isUser, setIsUser] = useState(false);

	const createUser = async () => {
		if (!isUser) {
			await createNewEmployee(
				userInfo.personalNumber,
				userInfo.name,
				userInfo.position,
				Number(userInfo.salary),
				userInfo.family,
				Number(userInfo.children)
			);
		} else {			
			await createNewUser(
			userInfo.personalNumber,
			userInfo.name,
			userInfo.position,
			Number(userInfo.salary),
			userInfo.family,
			Number(userInfo.children),
			userInfo.login,
			userInfo.password,
			userInfo.roles
			)
		}
		setUserInfo(initInfo);
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
								<Form.Control
									placeholder="Введите номер сотрудника..."
									value={userInfo.personalNumber}
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, personalNumber: e.target.value };
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="nameUser">
								<Form.Label className="fw-bold">ФИО</Form.Label>
								<Form.Control
									value={userInfo.name}
									placeholder="Введите имя сотрудника..."
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, name: e.target.value };
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="positionUser">
								<Form.Label className="fw-bold">Должность</Form.Label>
								<Form.Control
									value={userInfo.position}
									placeholder="Введите должность сотрудника..."
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, position: e.target.value };
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="salaryUser">
								<Form.Label className="fw-bold">Зарплата</Form.Label>
								<Form.Control
									type="number"
									value={userInfo.salary}
									placeholder="Введите зарплату сотрудника..."
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, salary: e.target.value };
										})
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="familyUser">
								<Form.Label className="fw-bold">Семейное положение</Form.Label>
								<Form.Control
									value={userInfo.family}
									placeholder="Введите семейное положение сотрудника..."
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, family: e.target.value };
										})
									}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="childreUser">
								<Form.Label className="fw-bold">Количество детей</Form.Label>
								<Form.Control
									type="number"
									value={userInfo.children}
									placeholder="Введите количество детей сотрудника..."
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, children: e.target.value };
										})
									}
								/>
							</Form.Group>
						</Form>
					</Col>
					<Col xs={6}>
						<Form>
							<h2>Учетная запись</h2>
							<hr />

							<Form.Group className="mb-3" controlId="loginUser">
								<Form.Label className="fw-bold">Логин</Form.Label>
								<Form.Control
									disabled={!isUser}
									placeholder="Введите логин..."
									value={userInfo.login}
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, login: e.target.value };
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="passwordUser">
								<Form.Label className="fw-bold">Пароль</Form.Label>
								<Form.Control
									disabled={!isUser}
									placeholder="Введите пароль..."
									type="password"
									value={userInfo.password}
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, password: e.target.value };
										})
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="roleUser">
								<Form.Label className="fw-bold">Роль</Form.Label>

								<Form.Select
									className="mb-3"
									aria-label="Default select example"
									disabled={!isUser}
									value={userInfo.roles}
									onChange={e =>
										setUserInfo(prev => {
											return { ...prev, roles: e.target.value };
										})
									}
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
					onClick={createUser}
				>
					Создать сотрудника
				</Button>
			</Card>
		</Container>
	);
};

export default NewUser;
