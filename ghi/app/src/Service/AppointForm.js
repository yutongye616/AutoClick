import React, { useEffect, useState } from 'react';
import { SERVICE_API } from '../apiConfig';


function ServForm() {
    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const [date, setDate] = useState('');
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const [time, setTime] = useState('');
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }
    const [service_reason, setReason] = useState('');
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }
    const [technician, setTech] = useState('');
    const handleTechChange = (event) => {
        const value = event.target.value;
        setTech(value);
    }
    const [techs, setTechs] = useState([]);
    const fetchData = async () => {
        const response = await fetch(`${SERVICE_API}/api/technicians/`);

        if (response.ok) {
            const data = await response.json();
            setTechs(data.techs)
        }
    }

    const [submittedAuto, setSubmittedAuto] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
        vin,
        customer,
        date_time: `${date} ${time}`,
        technician,
        service_reason,
        status: "tbd",
      };

      const appUrl = `${SERVICE_API}/api/appointments/`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
      };
      const response = await fetch(appUrl, fetchConfig);
      if (response.ok) {
        const newApp = await response.json();
        console.log(newApp);
        setVin('');
        setCustomer('');
        setDate('');
        setTime('');
        setTech('');
        setReason('');
        setSubmittedAuto(true);
      }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const formClasses = (!submittedAuto) ? '' : 'd-none';
    const messageClasses = (!submittedAuto) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';

    return (
        <div className="hero px-3">
        <div className="row w-100">
          <div className="col-12 col-lg-6 offset-lg-3">
            <div className="shadow p-4 rounded bg-white">
              <h1>Schedule a Vehicle Service</h1>
              <form className={formClasses} onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                  <input onChange={handleVinChange} placeholder="vin" required type="text" name="vin" value={vin} id="vin" className="form-control"/>
                  <label htmlFor="vin">Vehicle VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleCustomerChange} placeholder="customer" required type="text" name="customer" value={customer} id="customer" className="form-control"/>
                  <label htmlFor="customer">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleDateChange} placeholder="YYYY/MM/DD" required type="date" name="date" value={date} id="date" className="form-control"/>
                  <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleTimeChange} placeholder="HH:mm" required type="time" name="time" value={time} id="time" className="form-control"/>
                  <label htmlFor="time">Time</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleReasonChange} placeholder="service_reason" required type="text" name="service_reason" value={service_reason} id="service_reason" className="form-control"/>
                  <label htmlFor="service_reason">Reason</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleTechChange} required name="technician" value={technician} id="technician" className="form-select">
                    <option value="">Choose A Technician...</option>
                    {techs.map(techs => {
                        return ([
                            <option key={techs.id} value={techs.id}>{techs.first_name + " " + techs.last_name}</option>,
                        ]);
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
              <div className={messageClasses} id="success-message">
                        You have created a Service Appointment!
              </div>
            </div>
          </div>
        </div>
        </div>
      );
}


export default ServForm;
