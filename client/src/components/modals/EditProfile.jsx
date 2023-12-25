import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { updateInfo } from '../../API/userAPI';

const EditProfile = ({ show, onHide, refetch, initInfo }) => {
	const [userInfo, setUserInfo] = useState(initInfo);

	useEffect(() => {
		setUserInfo(initInfo);
	}, [initInfo]);

	const hideNull = () => {
		onHide();
	};

	const changeInfo = async () => {
		const res = await updateInfo(
      userInfo.id,
			userInfo.personalNumber,
			userInfo.name,
			userInfo.position,
			Number(userInfo.salary),
			userInfo.family,
			Number(userInfo.children)
		);
		onHide();
		refetch();
	};

	return (
		<Modal show={show} onHide={hideNull} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Редактирование информации
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<h2>Информация</h2>
					<hr />
					<Form.Group className="mb-3" controlId="personalNumber">
						<Form.Label className="fw-bold">Номер сотрудника</Form.Label>
						<Form.Control
							placeholder="Введите номер сотрудника..."
							value={userInfo?.personalNumber}
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
							value={userInfo?.name}
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
							value={userInfo?.position}
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
							value={userInfo?.salary}
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
							value={userInfo?.family}
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
							value={userInfo?.children}
							placeholder="Введите количество детей сотрудника..."
							onChange={e =>
								setUserInfo(prev => {
									return { ...prev, children: e.target.value };
								})
							}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={hideNull}>
					Закрыть
				</Button>
				<Button variant="outline-success" onClick={changeInfo}>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditProfile;
