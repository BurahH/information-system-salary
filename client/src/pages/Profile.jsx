import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getUserById } from '../API/userAPI';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
	const { id } = useParams();

	const { data } = useQuery({
		queryKey: [`user${id}`, id],
		queryFn: async () => getUserById(id),
    enabled: !!id
	});

  console.log(data)

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ПРОФИЛЬ</Row>
			<Row>
				<Col>
					<Image src="/profile.png" style={{ width: 200 }} />
				</Col>
				{data && (
					<Col>
						<Row>{data.id}</Row>
						<Row>{data.name}</Row>
						<Row>{data.personal_number}</Row>
						<Row>{data.position}</Row>
						<Row>{data.salary}</Row>
						<Row>{data.family}</Row>
						<Row>{data.children}</Row>
						<Row>{data.role}</Row>
						{/* <Row>
							{data.ilneses.length === 0 ? (
								<h2>Не болел</h2>
							) : (
								<div>
									<h2>БОЛЕЗНИ</h2>
									{data.ilneses.map(ilness => (
										<Card key={ilness.id} className="p-2 mb-2">
											<div>{ilness.id}</div>
											<div>
												{new Date(ilness.date_start).toLocaleDateString(
													'ru-RU'
												)}
											</div>
											<div>
												{new Date(ilness.date_end).toLocaleDateString('ru-RU')}
											</div>
											<div>{ilness.information}</div>
										</Card>
									))}
								</div>
							)}
						</Row>
						<Row>
							{data.bonuses.length === 0 ? (
								<h2>Нет надбавок</h2>
							) : (
								<div>
									<h2>Надбавки</h2>
									{data.bonuses.map(bonus => (
										<Card key={bonus.id} className="p-2 mb-2">
											<div>{bonus.id}</div>
											<div>{bonus.bonus}</div>
											<div>
												{new Date(bonus.date).toLocaleDateString('ru-RU')}
											</div>
											<div>{bonus.information}</div>
										</Card>
									))}
								</div>
							)}
						</Row> */}
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default Profile;
