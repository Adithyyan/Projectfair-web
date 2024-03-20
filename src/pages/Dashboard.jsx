import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Myprofile from '../components/Myprofile'
import { Row, Col } from 'react-bootstrap'

function Dashboard() {

  const [username, setUsername] = useState("")

  useEffect(()=>{
     setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
  return (
    <>
      <div>
        <Header Dashboard/>
      </div>
      <h4 className='ms-3'>Welcome <span className='text-warning'>{username}</span></h4>
      <div>
        <Row className='container-fluid mt-5 mb-5'>
          <Col md={8} sm={12} className=''> <Myproject/> </Col>
          <Col md={4} sm={12}> <Myprofile/> </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard