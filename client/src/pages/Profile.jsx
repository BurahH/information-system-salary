import React, { useState } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { usersData } from '../data/users';

const Profile = () => {
  const {id} = useParams()

  const [user, setUser] = useState(usersData.filter(user => user.id === Number(id))[0])

	return (
		<Container>
			<Row className="fs-3 fw-bold justify-content-center">ПРОФИЛЬ</Row>
			<Row>
				<Col>
					<Image src="/profile.png" style={{ width: 200 }} />
				</Col>
				<Col>
          <Row>{user.id}</Row>
          <Row>{user.name}</Row>
          <Row>{user.personal_number}</Row>
          <Row>{user.position}</Row>
          <Row>{user.salary}</Row>
          <Row>{user.family}</Row>
          <Row>{user.children}</Row>
          <Row>{user.role}</Row>
          <Row>{user.ilneses.length === 0 ? <h2>Не болел</h2> : <div>
            <h2>БОЛЕЗНИ</h2>
            {user.ilneses.map(ilness => <Card key={ilness.id} className='p-2 mb-2'>
              <div>{ilness.id}</div>
              <div>{new Date(ilness.date_start).toLocaleDateString('ru-RU')}</div>
              <div>{new Date(ilness.date_end).toLocaleDateString('ru-RU')}</div>
              <div>{ilness.information}</div>
            </Card>)}
          </div> }</Row>
          <Row>{user.bonuses.length === 0 ? <h2>Нет надбавок</h2> : <div>
            <h2>Надбавки</h2>
            {user.bonuses.map(bonus => <Card key={bonus.id} className='p-2 mb-2'>
              <div>{bonus.id}</div>
              <div>{bonus.bonus}</div>
              <div>{new Date(bonus.date).toLocaleDateString('ru-RU')}</div>
              <div>{bonus.information}</div>
            </Card>)}
          </div> }</Row>
        </Col>
			</Row>
		</Container>
	);
};

export default Profile;
