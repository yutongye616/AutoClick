import { useEffect, useState } from 'react';
import { INVENTORY_API, SERVICE_API } from '../apiConfig';

const OVERDUE_AFTER_DAYS = 365;

function computeStatus(auto, lastServiceDate) {
    if (auto.has_open_recall) {
        return { label: 'Recall Open', badgeClass: 'bg-danger' };
    }
    if (!lastServiceDate) {
        return { label: 'Never Serviced', badgeClass: 'bg-danger' };
    }
    const daysSince = Math.floor((Date.now() - lastServiceDate.getTime()) / 86400000);
    if (daysSince > OVERDUE_AFTER_DAYS) {
        return { label: `Overdue (${daysSince}d)`, badgeClass: 'bg-warning text-dark' };
    }
    return { label: `Up to Date (${daysSince}d)`, badgeClass: 'bg-success' };
}

function SafetyOverview() {
    const [rows, setRows] = useState([]);

    const getData = async () => {
        const [autoResponse, appointmentResponse] = await Promise.all([
            fetch(`${INVENTORY_API}/api/automobiles/`),
            fetch(`${SERVICE_API}/api/appointments/`),
        ]);

        if (!autoResponse.ok || !appointmentResponse.ok) {
            return;
        }

        const autoData = await autoResponse.json();
        const appointmentData = await appointmentResponse.json();
        const finishedAppointments = appointmentData.appointments.filter(
            (appointment) => appointment.status === 'finished'
        );

        const computedRows = autoData.autos.map((auto) => {
            const serviceDates = finishedAppointments
                .filter((appointment) => appointment.vin === auto.vin)
                .map((appointment) => new Date(appointment.date_time));
            const lastServiceDate = serviceDates.length
                ? new Date(Math.max(...serviceDates))
                : null;

            return {
                vin: auto.vin,
                model: `${auto.model.manufacturer.name} ${auto.model.name}`,
                lastServiceDate,
                status: computeStatus(auto, lastServiceDate),
            };
        });

        setRows(computedRows);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="hero px-4">
        <div className="row w-100 justify-content-center">
        <div className="col-11 col-lg-9">
        <div className="shadow p-4 rounded bg-white">
            <h1>Vehicle Safety Overview</h1>
            <p className="text-muted">
                Cross-references every vehicle's recall status and completed
                service history to flag which ones need attention.
            </p>
            <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Vehicle</th>
                        <th>Last Service</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.vin}>
                            <td>{row.vin}</td>
                            <td>{row.model}</td>
                            <td>{row.lastServiceDate ? row.lastServiceDate.toLocaleDateString() : 'Never'}</td>
                            <td>
                                <span className={`badge ${row.status.badgeClass}`}>
                                    {row.status.label}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default SafetyOverview;
