import React from 'react'
import Card from 'react-bootstrap/Card';
import projectImage from '../assets/media player.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { base_url } from '../services/baseurl';

function Projectcard({item}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(item);

  return (
    <>
       <Card className='shadow text-center btn mt-5 mb-5' onClick={handleShow} >
      <Card.Img variant="top" height={'250px'}  src={item?`${base_url}/uploads/${item.projectimage}`:projectImage} />
      <Card.Body>
        <Card.Title className='text-info'>{item.title}</Card.Title>
      </Card.Body>
    </Card> 

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={'100%'} src={item?`${base_url}/uploads/${item.projectimage}`:projectImage} alt='no image'></img>
            </Col>
            <Col md={6}>
              <h4>Destination</h4>
              <p>{item.overview}</p>
              <p><span className='fw-bolder'>: {item.language}</span>HTML,CSS,React</p>
            </Col>
          </Row>
          <div className="d-flex mt-5 mb-3">
            <a href={item.github} target='_blank' style={{color:'black'}}><i class= 'fa-brands fa-github fa-2x ms-3'></i></a>
            <a href={item.website} target='_blank' style={{color:'black'}}><i class= 'fa-solid fa-link ms-3 fa-2x'></i></a>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Projectcard