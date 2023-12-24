import React, { useMemo, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../routes/consts';
import { getUsers } from '../API/userAPI';

import { useQuery } from '@tanstack/react-query';

const Users = () => {
	const [name, setName] = useState('');
	const { data } = useQuery({ queryKey: ['users'], queryFn: getUsers });

  const test = async () => {
    const { dat } = await $API.get('http://26.162.53.239:8080/employee');
    console.log(dat);
  }

  test();
  
	const searchedUsers = useMemo(() => {
		if (name) {
			return data.filter(user => user.name.includes(name));
		}
		return data;
	}, [name, data]);

	const navigate = useNavigate();

	return (
		<Container>
			<Row className="fs-3 mb-3 fw-bold justify-content-center">
				ПОЛЬЗОВАТЕЛИ
			</Row>
			<Row>
				<Form style={{ width: 455 }}>
					<Form.Label className="ms-1 fw-bold">Поиск по ФИО</Form.Label>
					<Form.Control
						placeholder="Введите ФИО..."
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Form>
			</Row>
			<Table striped bordered hover className="text-center mt-4">
				<thead>
					<tr className='table-primary'>
						<th>#</th>
						<th>Номер сотрудника</th>
						<th>ФИО</th>
						<th>Должность</th>
						<th>Зарплата</th>
						<th>Семейное положение</th>
						<th>Число детей</th>
						<th>Роль</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						searchedUsers.map(user => (
							<tr
								key={user.id}
								onClick={() => navigate(PROFILE_ROUTE + '/' + user.id)}
								style={{ cursor: 'pointer' }}
							>
								<td>{user.id}</td>
								<td>{user.personalNumber}</td>
								<td>{user.name}</td>
								<td>{user.position}</td>
								<td>{user.salary}</td>
								<td>{user.family}</td>
								<td>{user.children}</td>
								<td>{user.roles ? user.roles === 'user' ? 'Бухгалтер' : 'Администратор' :'Работник' }</td>
								<td>{user.active ? 'Активный' : 'Заблокированый'}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Users;
