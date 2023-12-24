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
import { getUsers, loginUser } from '../API/userAPI';

const Authorization = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const { token } = await loginUser(login, password);
			user.setIsAuth(true);
      `УСТАНОВИЛИ ТОКЕН ${token}`
			localStorage.setItem(
				'token',
				`${token}`
			);

      const { data } = await fetch('http://26.162.53.239:8080/employee', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzNDU2NzI4LCJleHAiOjE3MDM0NTgxNjh9.Jpuct4cefZcLTudHH9-WLEsmuOOW3Cl2fZ3gEggMcT0',
        },
      })

      console.log(data);

		} catch (e) {
			console.log(e);
		}
	};

  // const test = async () => { // ВОТ ЭТО РАБОТАЕТ В ДАННЫЙ МОМЕНТ
  //   const data  = await fetch('http://26.162.53.239:8080/employee', {
  //     headers: {
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzNDU4MDkyLCJleHAiOjE3MDM0NTk1MzJ9.v0HPoM7L29tBlXRXBiFLEhJ4Kxk45S2ud8iRAMTvUzk'
  //     },
  //   })
  //   const body = await data.json();

  //   console.log(body)
  // }

  // const test = async () => {
  //   const data  = await fetch('http://26.162.53.239:8080/user/get/Disease/3', {
  //     headers: {
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzNDU4MDkyLCJleHAiOjE3MDM0NTk1MzJ9.v0HPoM7L29tBlXRXBiFLEhJ4Kxk45S2ud8iRAMTvUzk'
  //     },
  //   })
  //   const body = await data.json();

  //   console.log(body)
  // }

  // const test = async () => {
  //   const data  = await fetch('http://26.162.53.239:8080/user/get/Allowance/4', {
  //     headers: {
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiIiwiaWF0IjoxNzAzNDU4MDkyLCJleHAiOjE3MDM0NTk1MzJ9.v0HPoM7L29tBlXRXBiFLEhJ4Kxk45S2ud8iRAMTvUzk'
  //     },
  //   })
  //   const body = await data.json();

  //   console.log(body)
  // }

  const test = async () => {
    const data  = await getUsers();

    console.log(data)
  }

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
      <button onClick={() => test()}>TEST</button>
		</Container>
	);
});

export default Authorization;
