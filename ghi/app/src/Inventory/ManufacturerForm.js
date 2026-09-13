import React, {useState, useEffect} from 'react'
import { INVENTORY_API } from '../apiConfig';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: ''
    })
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const manufacturerURL = `${INVENTORY_API}/api/manufacturers/`

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(manufacturerURL, fetchConfig)

        if (response.ok) {
            setFormData({
                name: ''
            })
            setSubmitted(true);
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
          ...formData,
          [inputName]: value
        });
    }

    const formClasses = (!submitted) ? '' : 'd-none';
    const messageClasses = (!submitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';

    return (
        <div className="hero">
        <div className="row w-100">
          <div className="offset-3 col-6">
            <div className="shadow p-4 rounded bg-white">
              <h1>Add a Manufacturer</h1>
              <form className={formClasses} onSubmit={handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                  <input value={formData.name} onChange={handleFormChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Manufacturer Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
              <div className={messageClasses} id="success-message">
                You have added a Manufacturer!
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}

export default ManufacturerForm
