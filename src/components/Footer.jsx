import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{width:'100%',height:'300px', backgroundColor:'yellowgreen'}} className='d-flex align-items-center justify-content-center flex-column'>
    <div className='footer d-flex align-items-center justify-content-evenly w-100'>
      <div className="website" style={{width:'400px'}}>
        <h4><i className='fa-brands fa-stack-overflow me-3'></i>{' '}
        Project Fair</h4>
        <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil illum laboriosam, quisquam architecto ut et? Reprehenderit tempore ullam nam ipsa eaque corporis esse, libero aspernatur!</h6>
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum reiciendis</h6>
      </div>
      <div className="link d-flex flex-column">
        <h4>Links</h4>
        <Link to={'/'} style={{textDecoration:'none',color:'black'}}>Landing Page</Link>
        <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>Login Page</Link>
        <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>Register Page</Link>
      </div>
      <div className="guides d-flex flex-column">
        <h4>Guides</h4>
        <Link to={'/'} style={{textDecoration:'none',color:'black'}}>React</Link>
        <Link to={'/home'} style={{textDecoration:'none',color:'black'}}>React Bootsrap</Link>
        <Link to={'https://bootswatch.com/'} style={{textDecoration:'none',color:'black'}}>Bootswatch</Link>

      </div>
      <div className="contact d-flex flex-column">
      <h4>Contact Us</h4>
      <div className="d-flex">
        <input type='text' placeholder='enter your mail id' className='form-control' />
        <button className='btn btn-warning text-white ms-3'>Subscribe</button>
      </div>
      <div className="d-flex justify-content-evenly ">
        <Link to={''} style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-instagram fa-2x me-2 mt-4"></i></Link>
        <Link to={''} style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-twitter fa-2x me-2 mt-4"></i></Link>
        <Link to={''} style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-linkedin fa-2x me-2 mt-4"></i></Link>
        <Link to={''} style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-facebook fa-2x me-2 mt-4"></i></Link>
      </div>

      </div>
    </div>
    <p className='mt-5'>Copyright @ 2023 Project Fair, Built with React</p>
  </div>
  )
}

export default Footer