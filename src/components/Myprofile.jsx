import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Myprofile() {
    const [open, setOpen] = useState(false);
  return (
    <div>
        <div className='card shadow p-5 mb-5'>
            <div className="d-flex justify-content-between">
                <h1>Profile</h1>
                <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
            </div>
            <Collapse in={open}>
                <div className=" justify-content-center">
                    <label className="ms-5" htmlFor="profile">
                        <input id='profile' type="file" style={{display:'none'}} />
                        <img width={'250px'} height={'200px'} className='rounded-circle' src="https://th.bing.com/th/id/OIP.52T8HHBWh6b0dwrG6tSpVQHaFe?w=256&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="no image" />
                    </label>
                    <div className="mb-3">
                       <input type="text"  className='form-control' placeholder='GitHub'/>
                    </div>
                    <div className="mb-3">
                    <input type="text"  className='form-control' placeholder='LinkedIn'/>   
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-success rounded w-100'>Update</button>
                    </div>
                </div>
            </Collapse>
        </div>
    </div>
  )
}

export default Myprofile