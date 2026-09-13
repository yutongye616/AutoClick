import React, {useState, useEffect} from 'react'
import { INVENTORY_API, SALES_API } from '../apiConfig';

function SaleForm() {
    const [autos, setAutomobiles] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState({
        price: '',
        automobile: '',
        salesperson: '',
        customer: ''
    })
    const [submitted, setSubmitted] = useState(false);

    const getData = async () => {
        const autourl = `${INVENTORY_API}/api/automobiles/`;
        const salespersonurl = `${SALES_API}/api/salespeople/`;
        const customerurl = `${SALES_API}/api/customers/`;
        const responses = await Promise.all([fetch(autourl), fetch(salespersonurl), fetch(customerurl)]);
        if (responses.every(response => response.ok)) {
          const [autosData, salespeopleData, customersData] = await Promise.all(responses.map(response => response.json()));
          setAutomobiles(autosData.autos);
          setSalespeople(salespeopleData.salesperson);
          setCustomers(customersData.customer);

        }
      }

      useEffect(() => {
        if (formData.automobile) {
            const index = autos.findIndex(auto => auto.id === formData.automobile);
            if (index !== -1) {
                const newAutos = [...autos]
                newAutos[index].sold = true
                setAutomobiles(newAutos)
            }
        }
        getData();
      }, [formData]);

      const handleSubmit = async (event) => {
        event.preventDefault();

        const saleUrl = `${SALES_API}/api/sales/`;

        try {
            const selectedAutomobile = autos.find(auto => auto.vin === formData.automobile);
            const selectedSalesperson = salespeople.find(salesperson => salesperson.employee_id === formData.salesperson);
            const selectedCustomer = customers.find(customer => customer.first_name === formData.customer);

            const formDataToSend = {
                price: formData.price,
                automobile: selectedAutomobile ? selectedAutomobile.vin : '',
                salesperson: selectedSalesperson ? selectedSalesperson.employee_id : '',
                customer: selectedCustomer ? selectedCustomer.first_name : '',
            };

            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formDataToSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(saleUrl, fetchConfig);

            if (response.ok) {
                const automobileUpdateUrl = `${INVENTORY_API}/api/automobiles/${encodeURIComponent(formDataToSend.automobile)}/`;
                const automobileUpdateConfig = {
                    method: 'put',
                    body: JSON.stringify({ sold: true }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const updateResponse = await fetch(automobileUpdateUrl, automobileUpdateConfig);

                if (updateResponse.ok) {
                    setFormData({
                        price: '',
                        automobile: '',
                        salesperson: '',
                        customer: '',
                    });

                    getData();
                    setSubmitted(true);
                }
            } else {
                console.error('Error submitting sale:', response.statusText);
                const responseBody = await response.json();
                console.error('Response body:', responseBody);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

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
                    <h1>Create a Sale</h1>
                    <form className={formClasses} onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                            <label htmlFor="name">Price</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="automobile">Automobile VIN</label>
                            <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                            <option value="" disabled> Select Automobile VIN </option>
                            {autos.map(autos => {
                                return (
                                    <option key={autos.vin} value={autos.vin}>{autos.vin}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson">Salesperson</label>
                            <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                            <option value="" disabled>Salesperson Employee ID</option>
                            {salespeople.map(salesperson => {
                                return (
                                    <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.employee_id}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                            <option value="" disabled>Customer First Name</option>
                            {customers.map(customer => {
                                return (
                                    <option key={customer.first_name} value={customer.first_name}>{customer.first_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={messageClasses} id="success-message">
                        You have created a Sale!
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SaleForm
