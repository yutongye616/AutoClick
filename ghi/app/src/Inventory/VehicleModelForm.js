import React, {useState, useEffect} from 'react'
import { INVENTORY_API } from '../apiConfig';

function VehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        manufacturer_id: '',
        picture_url: '',
    })
    const [submitted, setSubmitted] = useState(false);

    const getData = async () => {
        const url = `${INVENTORY_API}/api/manufacturers/`
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const modelUrl = `${INVENTORY_API}/api/models/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(modelUrl, fetchConfig)

        if (response.ok) {
            setFormData({
                name: '',
                manufacturer_id: '',
                picture_url: '',
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
                    <h1>New Model</h1>
                    <form className={formClasses} onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.name} placeholder="Model Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                        </div>
                        <div className="mb-3">
                        <select value={formData.manufacturer_id} onChange={handleFormChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                            <option value="">Select Manufacturer</option>
                            {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                                </option>
                            );
                            })}
                        </select>
                        </div>
                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={messageClasses} id="success-message">
                        You have added a Vehicle Model!
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default VehicleModelForm
