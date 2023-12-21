import React, { useContext, useState } from 'react';
import {
	Button,
	Container,
	Nav,
	NavDropdown,
	Navbar,
	Offcanvas,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { FaRubleSign } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import {
	NEW_ADMIN_ROUTE,
	NEW_USER_ROUTE,
	PAYMENTS_ROUTE,
	PROFILE_ROUTE,
	USERS_ROUTE,
} from '../routes/consts';

const NavBar = observer(() => {
	const { user } = useContext(Context);

	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLogout = () => {
		user.setIsAuth(false);
	};

	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark">
				<Container style={{ height: 70 }}>
					{user.isAuth && (
						<IoMenu
							style={{ color: 'white', cursor: 'pointer' }}
							size={50}
							onClick={handleShow}
						/>
					)}
					<div
						style={{ color: 'white' }}
						to={'/'}
						className="text-decoration-none fs-4 fw-bold mx-auto"
					>
						<FaRubleSign />
						<span className="ms-3" style={{ cursor: 'default' }}>
							ЗАРПЛАТА
						</span>
					</div>

					{user.isAuth && (
						<Nav>
							<NavDropdown
								id="nav-dropdown-dark-example"
								title={user.info.login}
								menuVariant="dark"
								className="fs-5 fw-bold"
							>
								<NavDropdown.Item
									onClick={() => navigate(PROFILE_ROUTE + '/' + user.info.id)}
								>
									Профиль
								</NavDropdown.Item>
								<NavDropdown.Item>Роль: {user.info.role}</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item>
									<Button
										variant="danger"
										onClick={() => handleLogout()}
										className="px-5"
									>
										Выйти
									</Button>
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Container>

				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton className="me-3">
						<Offcanvas.Title className="fs-3 fw-bold ms-3">
							Меню
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Container className="d-flex flex-column">
							<Button
								variant="outline-dark"
								className="mb-4 p-3"
								onClick={() => {
									navigate(PAYMENTS_ROUTE);
									handleClose();
								}}
							>
								Выплаты
							</Button>
							<Button
								variant="outline-dark"
								className="mb-4 p-3"
                onClick={() => {
									navigate(USERS_ROUTE);
									handleClose();
								}}							>
								Список пользователей
							</Button>
							<Button
								variant="outline-dark"
								className="mb-4 p-3"
                onClick={() => {
									navigate(NEW_USER_ROUTE);
									handleClose();
								}}							>
								Добавление работников
							</Button>
							<Button
								variant="outline-dark"
								className="mb-4 p-3"
                onClick={() => {
									navigate(NEW_ADMIN_ROUTE);
									handleClose();
								}}							>
								Добавление бухгалтеров и администраторов
							</Button>
						</Container>
					</Offcanvas.Body>
				</Offcanvas>
			</Navbar>
			<br />
		</>
	);
});

export default NavBar;
