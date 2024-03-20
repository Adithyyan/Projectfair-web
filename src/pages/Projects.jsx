import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Projects({item}) {

  const [ allProject, setAllProject ] = useState([])

  const [searchKey,setSearchKey] = useState("")

  const [isToken,setIsToken] = useState(false)

  const getAllProject = async()=>{
    
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
    
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`

      }

      const result = await allProjectAPI(searchKey,reqHeader)
    console.log(result.data);
    
    setAllProject(result.data)

    console.log(searchKey);

    }
    

  }

  useEffect(()=>{
    getAllProject()
  },[searchKey])


  useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setIsToken(true)
  }
  },[])

  return (
    <>
      <Header/>
      <div className='justify-content-center align-items-center d-flex flex-column mt-5'>
        <h1>All Project</h1>
        <div className="d-flex mt-5 w-25 shadow border border-danger border-3 rounded">
          <input  type="text" value={searchKey} onChange={e=>setSearchKey(e.target.value)} class='form-control' placeholder='Search the projects using technologies' />
          <i style={{marginLeft:'-45px',color:'lightgray'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
      <Row>
        {allProject?.length>0?
        allProject.map((item)=>(<Col sm={12} md={6} lg={4}>
          <Projectcard item={item}/>
         </Col>))
         :<div>
         {isToken?<p className='h2'> No more content</p>:
         <div className='d-flex justify-content align-items-center flex-column'>
           <img src='https://www.shahucollegelatur.org.in/Activity%20portal/img/login.gif' alt='no-image' height={'400px'}/>
           <p className='h2'> Please  <Link className='text-danger' to={'/login'}> login</Link>to view more content</p>: 
           
         </div>}
         </div>
         
        }

      </Row>
    </>
  )
}

export default Projects