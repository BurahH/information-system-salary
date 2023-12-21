import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import {
	Button,
	Card,
	Container,
	Form,
	Image,
	Col,
	Row,
} from 'react-bootstrap';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { USERS_ROUTE } from '../routes/consts';

const Authorization = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = () => {
    user.setIsAuth(true);
    navigate(USERS_ROUTE)

  }

	return (
		<Container
			className="d-flex justify-content-center"
			style={{ paddingTop: 115 }}
		>
			<Card>
				<Card.Header className='text-center fs-4 fw-bold'>Авторизация</Card.Header>
				<Card.Body>
					<Row>
						<Col>
							<Image src="auth.png" width={400} />
						</Col>
						<Col>
							<Form onSubmit={() => handleSubmit()} className='mt-4'>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label className='fw-bold'>Логин</Form.Label>
									<Form.Control
										type="text"
										placeholder="Введите логин..."
										required
									/>
								</Form.Group>

								<Form.Group className="mb-4" controlId="formBasicPassword">
									<Form.Label className='fw-bold'>Пароль</Form.Label>
									<Form.Control
										type="password"
										placeholder="Введите пароль..."
										required
									/>
								</Form.Group>

								<Button variant="primary" type="submit" className='px-5'>
									Войти
								</Button>
							</Form>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
});

export default Authorization;
