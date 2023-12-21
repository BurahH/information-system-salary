import React, { useContext, useState } from 'react';
import { Button, Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { FaRubleSign } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";

const NavBar = observer(() => {
	const { user } = useContext(Context);

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
            <IoMenu style={{color: 'white', cursor: 'pointer'}} size={50} onClick={handleShow}/>
					)}
					<NavLink
						style={{ color: 'white' }}
						to={'/'}
						className="text-decoration-none fs-4 fw-bold mx-auto"
					>
						<FaRubleSign />
						<span className="ms-3">ЗАРПЛАТА</span>
					</NavLink>

					{user.isAuth && (
						<Nav>
							<NavDropdown
								id="nav-dropdown-dark-example"
								title={user.info.login}
								menuVariant="dark"
							>
								<NavDropdown.ItemText>{user.info.name}</NavDropdown.ItemText>
								<NavDropdown.ItemText>{user.info.role}</NavDropdown.ItemText>
								<NavDropdown.Item>Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={() => handleLogout()}>
									Выйти
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Container>

        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
			</Navbar>
			<br />
		</>
	);
});

export default NavBar;
