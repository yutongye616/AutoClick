import { useEffect, useState } from 'react';
import { INVENTORY_API } from '../apiConfig';


function AutomobileList() {
    const [autos, setAuto] = useState([]);

    const getData = async() => {
        const autoUrl = `${INVENTORY_API}/api/automobiles/`;
        const response = await fetch(autoUrl);

        if (response.ok) {
            const data = await response.json();
            setAuto(data.autos)
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    const handleDelete = async (vin) => {
        const response = await fetch(`${INVENTORY_API}/api/automobiles/${vin}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setAuto((prevAutos) => prevAutos.filter((auto) => auto.vin !== vin));
        }
    }

    const handleToggleRecall = async (vin, hasOpenRecall) => {
        const response = await fetch(`${INVENTORY_API}/api/automobiles/${vin}/`, {
            method: 'PUT',
            body: JSON.stringify({ has_open_recall: !hasOpenRecall }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const updated = await response.json();
            setAuto((prevAutos) =>
                prevAutos.map((auto) => (auto.vin === vin ? updated : auto))
            );
        }
    }

    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-9">
        <div className="shadow p-4 rounded bg-white">
            <h1>Automobile List</h1>
        <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                    <th>Safety</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {autos.map(autos => {
                    const key = autos.id;
                    return (
                        <tr key={key}>
                            <td> { autos.vin } </td>
                            <td> { autos.color } </td>
                            <td> { autos.year } </td>
                            <td> { autos.model.name } </td>
                            <td> { autos.model.manufacturer.name } </td>
                            <td> { autos.sold ? 'Yes' : 'No' } </td>
                            <td>
                                {autos.has_open_recall ? (
                                    <span className="badge bg-danger">Recall Open</span>
                                ) : (
                                    <span className="badge bg-success">Clear</span>
                                )}
                            </td>
                            <td className="text-nowrap">
                                <button
                                    className={`btn btn-sm me-1 ${autos.has_open_recall ? 'btn-outline-secondary' : 'btn-warning'}`}
                                    onClick={() => handleToggleRecall(autos.vin, autos.has_open_recall)}
                                >
                                    {autos.has_open_recall ? 'Clear Recall' : 'Flag Recall'}
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(autos.vin)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
}


export default AutomobileList;
