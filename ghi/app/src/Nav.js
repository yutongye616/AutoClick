import { NavLink } from 'react-router-dom';

function closeMobileSidebar() {
  const el = document.getElementById('sidebarOffcanvas');
  const instance = window.bootstrap && el && window.bootstrap.Offcanvas.getInstance(el);
  if (instance) {
    instance.hide();
  }
}

function Nav() {
  return (
    <>
      <nav className="navbar navbar-dark bg-black d-flex d-lg-none align-items-center px-3 py-2 sticky-top">
        <button
          className="btn btn-outline-light border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink to="/" className="brand-text text-decoration-none fs-5 ms-3">
          Auto Click
        </NavLink>
      </nav>

      <div
        className="offcanvas offcanvas-start offcanvas-lg text-bg-dark sidebar"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header d-lg-none">
          <h5 className="offcanvas-title brand-text" id="sidebarOffcanvasLabel">Auto Click</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-3">
          <NavLink to="/" onClick={closeMobileSidebar} className="d-none d-lg-flex align-items-center mb-3 text-decoration-none">
            <span className="fs-4 brand-text">Auto Click</span>
          </NavLink>
          <hr className="d-none d-lg-block" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/">Home</NavLink>
            </li>

            <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Inventory</li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/automobiles">Vehicle Registry</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/automobiles/create">Register a Vehicle</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/manufacturers/">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/manufacturers/new/">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/models/">Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/models/new/">New Vehicle Model</NavLink>
            </li>

            <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Service</li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/technicians/create">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/appointments/create">Schedule a Vehicle Service</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/appointments/history">Vehicle Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/safety">Vehicle Safety Overview</NavLink>
            </li>

            <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Sales</li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/customers/">Customer List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/customers/new/">New Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/salespeople/">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/salespeople/new/">New Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/sales/">Sales List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={closeMobileSidebar} className="nav-link text-white" to="/api/sales/new">New Sale</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Nav;
