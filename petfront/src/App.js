import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdoptionRequests from './pages/AdoptionReuests';
import DashboardContent from './pages/DashboardContent';
import PetProducts from './pages/PetProducts';
import PetProductsLimit from './pages/PetProductsLimit';
import Login from './pages/login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Orders from './pages/Orders';
import Message from './pages/message';
import Home from './components/Client/Home'; 
import Shop from './components/Client/Shop';
import About from './components/Client/About';
import Contact from './components/Client/Contact';
import Category from './components/Client/Adoption';
import Pet from './pages/pet';
import AddPet from './pages/AddPet';
import AddPetFood from './pages/AddPetFood';
import EditPetProduct from './pages/EditProduct';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="" element={<DashboardContent />} />
            <Route path="pet" element={<Pet />} />
            <Route path="pet/addpet" element={<AddPet />} />
            <Route path="products" element={<PetProducts />} />
            <Route path="product-limits" element={<PetProductsLimit />} />
            <Route path="messages" element={<Message />} />
            <Route path="requests" element={<AdoptionRequests />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products/add-pet-food" element={<AddPetFood />} /> {/* Updated path */}
            <Route path="products/edit-product/:id" element={<EditPetProduct />} />
            {/* <Route path="reports" element={<Reports />} /> */}
          </Route>

          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="Shop" element={<Shop />} />
          <Route path="About" element={<About />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="/Category" element={<Category />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
