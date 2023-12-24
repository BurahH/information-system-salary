import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createNewDisease } from '../../API/userAPI';
import { getTimeStamp } from '../../utils/helpers';

const CreateDisease = ({ show, onHide, id, refetch }) => {
  const [info, setInfo] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

	const hideNull = () => {
    setInfo('');
    setDateStart('');
    setDateEnd('');
		onHide();
	};

  const createDisease = async () => {
    const newDateStart = getTimeStamp(dateStart);
    const newDateEnd = getTimeStamp(dateEnd);
    const res = await createNewDisease(id, newDateStart, newDateEnd, info);
    refetch();
    hideNull();
  }

	return (
		<Modal show={show} onHide={hideNull} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавление болезни
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>					
					<Form.Control
						value={info}
						onChange={e => setInfo(e.target.value)}
						placeholder={'Введите информацию о болезни'}
					/>
					<Form.Control
            className='mt-3'
						value={dateStart}
						onChange={e => setDateStart(e.target.value)}
						placeholder={'Введите дату начала'}
					/>					
					<Form.Control
            className='mt-3'
						value={dateEnd}
						onChange={e => setDateEnd(e.target.value)}
						placeholder={'Введите дату конца'}
					/>					
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={hideNull}>
					Закрыть
				</Button>
				<Button variant="outline-success" onClick={createDisease}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateDisease;
