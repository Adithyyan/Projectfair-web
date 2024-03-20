import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { Form } from 'react-router-dom';
import { base_url } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectResponseContext } from '../Contexts/ContextShare';


function EditProject({project}) {

      const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)

      const [show, setShow] = useState(false);
      const [preview, setPreview] = useState("")
      const [projectdetails,setprojectdetails]=useState({
        id :project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectimage:""
      })
      const handleClose = () => {setShow(false);
      handleClose1()}
      const handleShow = ()=> setShow(true);
      console.log(project);
      useEffect(()=>{
        if(projectdetails.projectimage){
           setPreview(URL.createObjectURL(projectdetails.projectimage))
        }
      },[projectdetails.projectimage])

      const handleClose1 = ()=>{
        setprojectdetails({
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectimage:""
        })
        setPreview("")
      }

      const handleUpdate = async()=>{
        const {id,title,language,github,website,overview,projectimage} = projectdetails

        if(!title || !title || !language || !github || !website || !overview){
            toast.info("Please fill the form completely")
        }
        else{
            const reqBody = new FormData()  
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",project.projectimage)

            const token = sessionStorage.getItem("token")
            
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                const result = await editProjectAPI(id,reqBody,reqHeader)
                console.log(result);

                if(result.status === 200){
                  console.log(result.data);
                  toast.success('updated successfully')
                  handleClose()
                  setEditProjectResponse(result.data)
                }
                else{
                  console.log(result.response.data);
                }
            }
            else{
                const reqHeader = {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                const result = await editProjectAPI(id,reqBody,reqHeader)
                console.log(result);
                if(result.status ===200){
                  toast.success('updated succesfully')
                  handleClose()
                  setEditProjectResponse(result.data)
                }
                else{
                  console.log(result.response.data);
                }

            }
        }
      }

  return (
    <>
    <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>
    <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}  
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-between p-2'>
              <div className='ms-3'>
                <label>
                  <input type="file" style={{display:"none"}} onChange={e=>setprojectdetails({...projectdetails,projectimage:e.target.files[0]})}/>
                  <img width="400px" className='img-fluid' src={`${base_url}/uploads/${project.projectimage}`} alt="no image" /></label>
              </div>
              <div className='ms-3'>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Project Title" value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Language used"  value={projectdetails.language} onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Github Link"  value={projectdetails.github} onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Website Link"  value={projectdetails.website} onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control placeholder='Project overview' as="textarea" rows={2}  value />
                </Form.Group          >
              </Form>
              </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose1}>
              Cancel
            </Button>
            <Button variant="succsess"  onClick={handleUpdate}>Update</Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer autoClose={2000} position='top-center' theme='colored' />

    </>
  )
}

export default EditProject