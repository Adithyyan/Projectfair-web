import React, { useState } from 'react'
import { Form, FormControl, FormGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({register}) {

    const [userData, setUserData] = useState({
        username:'',
        password:'',
        email:'',
        profile:'',
        github:'',
        linkedin:''
    })
    console.log(userData);
    
    const navigate = useNavigate()

    const registerForm = register?true:false
    
    const handleRegister = async(e)=>{
        e.preventDefault()

        const {username,password,email} = userData

        if(!username || !password || !email){
            toast.warning('Please fill the form completely')
        }
        else{
            const result = await registerAPI(userData)
            console.log(result.data);
            if(result.status===200){
                toast.success(`${result.data.username} has successfully registered`)
                setUserData({
                    username:"",
                    password:"",
                    email:""
                })
                //move to login page
                navigate('/login')
            }
            else{
                toast.error(result.response.data)
            }
        }

    }
    
    //Login function
    const handleLogin = async(e)=>{
        e.preventDefault()
        
        const {email, password} = userData
        if(!email || !password){
            toast.warning('Please fill the form completely')
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status===200){
                toast.success('Login successfully')
                setIsAuthToken(true)

                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)

                setUserData({
                    username:"",
                    password:"",
                    email:""
                })
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
            else{
                alert(result.response.data)
            }
            
            
        }
    }
 
    return (
      <div style={{width:"100%", height:"100vh"}} className='d-flex justify-content-center align-items-center'>
          <div className='container w-75 '>
              <Link to={'/'} style={{textDecoration:"none", color:"blue"}}><i class="me-2 fa-solid fa-arrow-left"></i>Back to Home</Link>
  
              <div className='card bg-success p-5 rounded'>
                  <div className='row align-items-center '>
                      <div className='col-lg-6'>
                          <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_Digital_Security.jpg" alt="no image" width={'100%'} className='rounded'/>
                      </div>
                      <div className='col-lg-6 p-3 '>
                          <div className='flex-column d-flex align-items-center'>
                              <h1 className='text-center text-light'><i class="fa-brands fa-stack-overflow me-2"></i> Project Fair</h1>
                              <h4 className='text-light mt-3 '>
                                  {
                                      registerForm?"Sign up to your account": "Sign in to your account"
                                  }
                              </h4>
                              <Form>
  
                                  {
                                      registerForm &&
                                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                                          <FormControl value={userData.username} onChange={(e)=>{setUserData({...userData,username:e.target.value})}} type='text' placeholder='Username'/>
                                      </Form.Group>
                                  }
                                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                                          <FormControl value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}  type='email' placeholder='Email ID'/>
                                      </Form.Group>
  
                                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                                          <FormControl value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}}  type='password' placeholder='Password'/>
                                  </Form.Group>
                                  {
                                      registerForm?
                                      <div>
                                         <button onClick={handleRegister} className='btn btn-danger'>Register</button>
                                      </div>
                                      : <div>
                                          <button onClick={handleLogin} className='btn btn-danger'>Sign in</button>
                                          <p>Are you a new user ? <Link to={'/register'}>Register</Link></p>
                                      </div>
                                  } 
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <ToastContainer autoClose={2000} position='top-center' theme='colored' />
          
      </div>
    )
  }
export default Auth