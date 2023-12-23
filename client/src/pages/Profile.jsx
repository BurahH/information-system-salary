import React from 'react';
import { Col, Container, Row, Badge, Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getUserById } from '../API/userAPI';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
	const { id } = useParams();

	const { data } = useQuery({
		queryKey: [`user${id}`, id],
		queryFn: async () => getUserById(id),
		enabled: !!id,
	});

	console.log(data);

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ПРОФИЛЬ</Row>
			{data && (
				<Row className="d-flex">
					<Col>
						<h1>{data.name} </h1>
					</Col>{' '}
					<Col className="d-flex">
						<h4 className="ms-auto mt-3">
							<Badge bg="secondary">#{data.id}</Badge>
						</h4>
					</Col>
				</Row>
			)}
			<Row>
				{data && (
					<div style={{ display: 'flex', gap: '20px' }}>
						<div>Номер: {data.personalNumber}</div>
						<div>Должность: {data.position}</div>
						<div>Зарплата: {data.salary}</div>
						<div>Семейное положение: {data.family}</div>
						<div>Количество детей: {data.children}</div>
						<div>Роль: {data.role || 'Работник'}</div>
					</div>
				)}
			</Row>
			<Row className='mt-4'>
				<Col>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Надбавки</Accordion.Header>
							<Accordion.Body>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Болезни</Accordion.Header>
							<Accordion.Body>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
