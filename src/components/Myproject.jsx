import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { addProjectAPI, allUserProject, deleteProjectAPI } from '../services/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../Contexts/ContextShare';
import EditProject from './EditProject';

function Myproject() {
  
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)


  const [userProject,setUserProject] = useState([])

  const getUserProject = async ()=>{

      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }  
    
      const result = await allUserProject(reqHeader)
      console.log(result.data);
      setUserProject(result.data)
  }

  useEffect(()=>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])


  const [projectdetails,setprojectdetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectimage:""
  })


  console.log(projectdetails);

  const handleClear=(e)=>{
    setprojectdetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })
    setPreview("")
  }

  const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,language,github,website,overview,projectimage}=projectdetails
    if(!title || !language || ! github || !website || !overview || !projectimage){
      alert("please fill the form completely")
    }
    else{
      //if there is any uploading content from a system we should send the data/body in the form of formdata
      //1) create an object for the class formData
       const reqBody=new FormData()
      
       //2) add value to the formData-append
       reqBody.append("title",title)
       reqBody.append("language",language)
       reqBody.append("github",github)
       reqBody.append("website",website)
       reqBody.append("overview",overview)
       reqBody.append("projectimage",projectimage)

       if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`

        }

       const result=await addProjectAPI(reqBody,reqHeader)
       console.log(result);

       if(result.status===200){
        alert('project succesfully added')
        handleClose()
        setAddProjectResponse(result.data)
       }
       else{
        console.log(result);
        alert(result.response.data)
       }
       }
       
    }
  }
  // to hold the url of the image
  const [preview,setPreview]=useState("")
  const[token,setToken]=useState("")

  useEffect(()=>{
      if(projectdetails.projectimage){
        //javascript predefined method URL-createobjectURL
        //files will be coverted into url
        setPreview(URL.createObjectURL(projectdetails.projectimage))
      }
  },[projectdetails.projectimage])

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
     
  },[])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleClear()
  }
  const handleShow = () => setShow(true);

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectAPI(id,reqHeader)
    console.log(result);
    if(result.status === 200){
      getUserProject()
    }
    else{
      alert(result.response.data)
    }
  }

  return (
    <div>
        <div className='container shadow border border-2 p-5'>
          <div className='d-flex justify-content-between '>
            <h4>My Projects</h4>
            <button onClick={handleShow} className='btn btn-success rounded'>Add project</button>
          </div>

          <div className=' mt-5 '>
            {userProject?.length>0?
            userProject?.map((item)=>(
            <div className='border d-flex align-items-center rounded p-2 mb-3'>
            <h5>{item.title}</h5>
            <div className='ms-auto'>
                <EditProject project={item}/>
                <a href={item.github} target='_blank' className='btn ms-2'><i class="fa-brands fa-github text-success"></i></a>
                <button onClick={()=>handleDelete(item._id)} className='btn ms-2'><i class="fa-solid fa-trash text-danger"></i></button>
            </div>
          </div>))
            :
            <p className='text-danger fw-bolder fs-4'>No project uploaded yet !!</p>}
            <div>

              <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}  
        >
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-between p-2'>
              <div className='ms-3'>
                <label>
                  <input type="file" style={{display:"none"}}  onChange={(e)=>{setprojectdetails({...projectdetails,projectimage:e.target.files[0]})}}/>
                  <img width="400px" className='img-fluid' src={preview?preview:"https://th.bing.com/th/id/OIP.g3jH7BYDzBm3PQ3hdWneXQHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="no image" /></label>
              </div>
              <div className='ms-3'>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Project Title" value={projectdetails.title} onChange={(e)=>{setprojectdetails({...projectdetails,title:e.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Language used"  value={projectdetails.language} onChange={(e)=>{setprojectdetails({...projectdetails,language:e.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Github Link"  value={projectdetails.github} onChange={(e)=>{setprojectdetails({...projectdetails,github:e.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Website Link"  value={projectdetails.website} onChange={(e)=>{setprojectdetails({...projectdetails,website:e.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control placeholder='Project overview' as="textarea" rows={2}  value={projectdetails.overview} onChange={(e)=>{setprojectdetails({...projectdetails,overview:e.target.value})}} />
                </Form.Group          >
              </Form>
              </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="primary" onClick={handleClear}>cancel</Button>
          </Modal.Footer>
        </Modal>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Myproject