import { NavLink } from 'react-router-dom';

function MainPage() {
  return (
    <div className="hero px-4 py-5 text-center">
      <div className="hero-content">
        <h1 className="display-3 fw-bold text-white mb-2">Auto Click</h1>
        <div className="hero-accent mx-auto mb-4" />
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-3 text-light">
            The premiere solution for automobile dealership
            management!
          </p>
          <p className="mb-4 text-light">
            Every vehicle is tracked by VIN from intake through every service
            visit, so open recalls and overdue maintenance never slip through
            the cracks.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <NavLink to="/automobiles" className="btn btn-danger btn-lg px-4 fw-semibold">
              View Inventory
            </NavLink>
            <NavLink to="/safety" className="btn btn-outline-light btn-lg px-4 fw-semibold">
              Vehicle Safety Overview
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
