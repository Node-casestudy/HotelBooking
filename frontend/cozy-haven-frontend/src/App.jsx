import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import HotelDetails from './pages/HotelDetails';
// import BookingForm from './pages/BookingForm';
// import Profile from './pages/Profile';
// import VerifyOwners from './pages/VerifyOwners'; 
import { AuthProvider } from './context/AuthContext';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboardCards from './pages/CardSwitching';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path='/admin/adminDashboard' element={<AdminDashboard/>}/>
            <Route path='/switchcard' element={<OwnerDashboardCards/>}/>
            {/* <Route path="/hotel/:id" element={<HotelDetails />} /> */}
            {/* <Route path="/book/:roomId" element={<BookingForm />} />
            <Route path="/profile" element={<Profile />} />
            // 
            <Route path="/admin/verify-owners" element={<VerifyOwners />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
