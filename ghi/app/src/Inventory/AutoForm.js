import React, { useEffect, useState } from 'react';
import { INVENTORY_API } from '../apiConfig';

function AutosForm() {
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const [model_id, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }
    const [models, setModels] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const fetchData = async () => {
        const response = await fetch(`${INVENTORY_API}/api/models/`);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    const handleSubmit = async (event) => {
        const data ={
            color,
            year,
            vin,
            model_id,
        };
        const autoUrl = `${INVENTORY_API}/api/automobiles/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAuto = await response.json();
            console.log(newAuto);
            setColor('');
            setYear('');
            setVin('');
            setModel('');
            setSubmitted(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const formClasses = (!submitted) ? '' : 'd-none';
    const messageClasses = (!submitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';

    return (
        <div className="hero px-3">
        <div className="row w-100">
          <div className="col-12 col-lg-6 offset-lg-3">
            <div className="shadow p-4 rounded bg-white">
              <h1>Add an automobile to inventory</h1>
              <form className={formClasses} onSubmit={handleSubmit} id="create-auto-form">
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" value={color} id="color" className="form-control"/>
                  <label htmlFor="color">Color...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleYearChange} placeholder="year" required type="number" name="year" value={year} id="year" className="form-control"/>
                  <label htmlFor="year">Year...</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} placeholder="vin" required type="text" name="vin" value={vin} id="vin" className="form-control"/>
                  <label htmlFor="vin">VIN...</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleModelChange} required name="model_id" value={model_id} id="model_id" className="form-select">
                    <option value="">Choose a model...</option>
                    {models.map(models => {
                      return ([
                          <option key={models.id} value={models.id}>{models.name}</option>,
                      ]);
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
              <div className={messageClasses} id="success-message">
                        You have added an Automobile to the inventory!
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }

    export default AutosForm;

