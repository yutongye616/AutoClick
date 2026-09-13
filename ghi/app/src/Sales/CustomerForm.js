import React, {useState, useEffect} from 'react'
import { SALES_API } from '../apiConfig';

function CustomerForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
    })
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const customerUrl = `${SALES_API}/api/customers/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(customerUrl, fetchConfig)

        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                address: '',
                phone_number: ''
            })
            setSubmitted(true);
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const formClasses = (!submitted) ? '' : 'd-none';
    const messageClasses = (!submitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';

    return (
        <div className="hero">
        <div className="row w-100">
            <div className="offset-3 col-6">
                <div className="shadow p-4 rounded bg-white">
                    <h1>New Customer</h1>
                    <form className={formClasses} onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="starts">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                        <label htmlFor="starts">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                        <label htmlFor="starts">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={messageClasses} id="success-message">
                        You have added a Customer!
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CustomerForm;
