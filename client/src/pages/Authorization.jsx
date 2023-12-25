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
import { PAYMENTS_ROUTE } from '../routes/consts';
import { checkAuth, getUserById, loginUser } from '../API/userAPI';

const Authorization = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const { token } = await loginUser(login, password);
      localStorage.setItem('token', `${token}`);

			const data = await checkAuth();
			user.setIsAuth(true);
			user.setUser({
				id: data.id,
				name: data.name,
				login: data.username,
				role: data.roles,
			});      

			navigate(PAYMENTS_ROUTE);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Container
			className="d-flex justify-content-center"
			style={{ paddingTop: 115 }}
		>
			<Card>
				<Card.Header className="text-center fs-4 fw-bold">
					Авторизация
				</Card.Header>
				<Card.Body>
					<Row>
						<Col>
							<Image src="auth.png" width={400} />
						</Col>
						<Col>
							<Form onSubmit={e => handleSubmit(e)} className="mt-4">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label className="fw-bold">Логин</Form.Label>
									<Form.Control
										type="text"
										placeholder="Введите логин..."
										required
										value={login}
										onChange={e => setLogin(e.target.value)}
									/>
								</Form.Group>

								<Form.Group className="mb-4" controlId="formBasicPassword">
									<Form.Label className="fw-bold">Пароль</Form.Label>
									<Form.Control
										type="password"
										placeholder="Введите пароль..."
										required
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
								</Form.Group>

								<Button variant="primary" type="submit" className="px-5">
									Войти
								</Button>
							</Form>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			{/* <button onClick={() => test()}>TEST</button> */}
		</Container>
	);
});

export default Authorization;
