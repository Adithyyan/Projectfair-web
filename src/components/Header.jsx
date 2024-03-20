import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header({Dashboard}) {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    //navigate to home
    navigate('/')
  }

  return (
    <Navbar className='bg-success p-3'>
        <Container>
            <Link to={'/'} style={{textDecoration:'none'}}><h3 className='text-light ms-5'><i class='fa-brands fa-stack-overflow'></i>Project Fair</h3></Link>
            {  
             <Link>
                Dashboard &&
              <button onClick={handleLogout} className='btn btn-warning me-5'><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</button></Link>
            }
        </Container>
        
    </Navbar>
  )
}

export default Header