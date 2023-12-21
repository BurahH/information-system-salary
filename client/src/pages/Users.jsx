import React, { useMemo, useState } from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { usersData } from '../data/users';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../routes/consts';

const Users = () => {
	const [users, setUsers] = useState(usersData);
	const [name, setName] = useState('');

  const searchedUsers = useMemo(() => {
    if (name) {
      return users.filter(user => user.name.includes(name))
    }
    return users
  }, [name, users])

	const navigate = useNavigate();

	return (
		<Container>
			<Row className="fs-3 mb-3 fw-bold justify-content-center">
				ПОЛЬЗОВАТЕЛИ
			</Row>
			<Row>
				<Form style={{ width: 455 }}>
					<Form.Label className="ms-1 fw-bold">Поиск по ФИО</Form.Label>
					<Form.Control placeholder="Введите ФИО..." value={name} onChange={e => setName(e.target.value)}/>
				</Form>
			</Row>
			<Table striped bordered hover className="text-center mt-4">
				<thead>
					<tr>
						<th>#</th>
						<th>Номер</th>
						<th>ФИО</th>
						<th>Должность</th>
						<th>Оклад</th>
						<th>Семейное положение</th>
						<th>Число детей</th>
						<th>Роль</th>
					</tr>
				</thead>
				<tbody>
					{searchedUsers.map(user => (
						<tr onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}>
							<td>{user.id}</td>
							<td>{user.personal_number}</td>
							<td>{user.name}</td>
							<td>{user.position}</td>
							<td>{user.salary}</td>
							<td>{user.family}</td>
							<td>{user.children}</td>
							<td>{user.role}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Users;
