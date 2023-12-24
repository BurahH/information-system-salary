import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createNewBonus } from '../../API/userAPI';

const CreateBonus = ({ show, onHide, id, toggleCreate }) => {
  const [sum, setSum] = useState(0);
  const [info, setInfo] = useState('');

	const hideNull = () => {
    setInfo('');
    setSum(0);
		onHide();
	};

  const createBonus = async () => {
    const date = new Date().getTime();
    const res = await createNewBonus(id, sum, info, date);
    hideNull();
    toggleCreate();
    return res;
  }

	return (
		<Modal show={show} onHide={hideNull} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавление надбавки
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>					
					<Form.Control
						value={info}
						onChange={e => setInfo(e.target.value)}
						placeholder={'Введите информацию о надбавке'}
					/>
					<Form.Control
            className='mt-3'
						value={sum}
						onChange={e => setSum(e.target.value)}
						placeholder={'Введите сумму надбавки'}
            type='number'
					/>					
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={hideNull}>
					Закрыть
				</Button>
				<Button variant="outline-success" onClick={createBonus}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateBonus;
