import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerList from './Sales/CustomerList';
import CustomerForm from './Sales/CustomerForm';
import SalesPeopleList from './Sales/SalesPeopleList';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesList from './Sales/SalesList';
import SaleForm from './Sales/SaleForm';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelList from './Inventory/VehicleModelList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AppointmentHistory from './Service/AppointHistory';
import TechnicianList from './Service/TechList';
import TechnicianForm from './Service/TechForm';
import AppointmentForm from './Service/AppointForm';
import AppointmentList from './Service/AppointList';
import AutomobileForm from './Inventory/AutoForm';
import AutomobileList from './Inventory/AutoList';


const FULL_BLEED_PATHS = [
  '/',
  '/api/customers/',
  '/api/customers/new/',
  '/api/salespeople/',
  '/api/salespeople/new/',
  '/api/sales/',
  '/api/sales/new',
  '/api/manufacturers/new/',
  '/api/models/new/',
  '/api/models/',
  '/api/manufacturers/',
  '/automobiles',
  '/automobiles/create',
  '/technicians',
  '/technicians/create',
  '/appointments',
  '/appointments/create',
  '/appointments/history',
];

function MainContent() {
  const location = useLocation();
  const isFullBleed = FULL_BLEED_PATHS.includes(location.pathname);

  return (
    <div className={isFullBleed ? 'content-area content-area-full' : 'content-area'}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/api/customers/" element={<CustomerList />} />
        <Route path="/api/customers/new/" element={<CustomerForm />} />
        <Route path="/api/salespeople/" element={<SalesPeopleList />} />
        <Route path="/api/salespeople/new/" element={<SalesPersonForm />} />
        <Route path="/api/sales/" element={<SalesList />} />
        <Route path="/api/sales/new" element={<SaleForm />} />
        <Route path="/api/manufacturers/" element={<ManufacturerList />}/>
        <Route path="/api/manufacturers/new/" element={<ManufacturerForm />} />
        <Route path="/api/models/" element={<VehicleModelList />} />
        <Route path="/api/models/new/" element={<VehicleModelForm />} />
        <Route path="automobiles">
          <Route index element={<AutomobileList />} />
          <Route path="create" element={<AutomobileForm />} />
        </Route>
        <Route path="technicians">
          <Route index element={<TechnicianList />} />
          <Route path="create" element={<TechnicianForm />} />
        </Route>
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
          <Route path="create" element={<AppointmentForm />} />
          <Route path="history" element={<AppointmentHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row" style={{ minHeight: '100vh' }}>
        <Nav />
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
