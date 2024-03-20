import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import titleImage from '../assets/Designer.png'
import { homeProjectAPI } from '../services/allAPI'

function Home() {

    // state to store token
    const [isLogin,setIsLogin] = useState()

    const [homeProject,setHomeProject] = useState()

   //get home Project 
    const getHomeProject = async()=>{
        const result = await homeProjectAPI()
        {/* console.log(result); */}
        setHomeProject(result.data)
    }

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setIsLogin(sessionStorage.getItem('token'))
      }
      else{
        setIsLogin("")
      }

    },[])

    useEffect(()=>{
        getHomeProject()
    })

    console.log(isLogin);

  return (
    <>
        <div style={{width:'100%',height:'100vh',backgroundColor:'yellowgreen'}} className='mb-5'>
            <div className="container-fluid rounded">
                <Row className='align-items-center p-5'>
                    <Col sm={12} md={6}>
                        <h1 className='text-light mb-4' style={{fontSize:'100px'}}>Project Fair</h1>
                        <p>One stop destination for all software development Projects</p>
                        { isLogin?
                            <Link style={{textDecoration:'none'}} to={'/dashboard'}><button className='btn btn-success rounded'>Manage Projects <i class="fa-solid fa-arrow-right ms-3"></i> </button></Link>:

                        <Link style={{textDecoration:'none'}} to={'/login'}><button className='btn btn-success rounded'>Get Started <i class="fa-solid fa-arrow-right ms-3"></i> </button></Link>}
                    </Col>
                    <Col sm={12} md={6} style={{marginTop:'100px'}}>
                        <img className='w-75' src={titleImage} alt='no image'></img>
                    </Col>
                </Row>
            </div>
        </div>

        {/* section for all projects */}

        <div className='all-projects mb-5 mt-5'>
            <div className="text-center">
                <h1>Explore our Projects</h1>
                <marquee scrollAmount={15}>
                    <div className="d-flex">

                       { homeProject?.length>0?
                         homeProject?.map((item)=>(<div className="ms-5" style={{width:'500px'}}>
                         <Projectcard item={item}/>
                      </div>))
                        : null
                        }

                    </div>
                </marquee>
                <div className="text-center mt-5">
                    <h6><Link to={'/project'}>See more projects</Link></h6>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home