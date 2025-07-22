import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'
// import HotelDetails from './pages/HotelDetails';
// import BookingForm from './pages/BookingForm';
// import Profile from './pages/Profile';
// import VerifyOwners from './pages/VerifyOwners'; 
import { AuthContext, AuthProvider } from './context/AuthContext';
import OwnerDashboard from './pages/owner/OwnerDashboard'
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboardCards from './pages/owner/CardSwitching';
import OwnerNavbar from './components/OwnerNavbar';
import { useContext } from 'react';
import HotelRoomsPage from './pages/customer/CustomerHotelDetails';
import HotelRoomsPageOwner from './pages/owner/OwnerHotelRooms'
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Booking from './pages/customer/Booking';

const App = () => {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // or use context
    return token ? children : <Navigate to="/login" />;
  };
  const { user } = useContext(AuthContext);

  const renderNavbar = () => {
    if (!user) return null; // or a generic navbar for unauthenticated users
    if (user.role === 'owner') return <OwnerNavbar />;
    return <Navbar />;
  };

  
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path='/admin/adminDashboard' element={<AdminDashboard/>}/>
            <Route path='/switchcard' element={<OwnerDashboardCards/>}/>
            <Route path='/hotel/:hotelId/rooms' element={<HotelRoomsPage/>}/>
            <Route path='/hotel/:hotelId/rooms/owner' element={<HotelRoomsPageOwner/>}/>
            <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>
            <Route path='/booking' element={<Booking/>}/>
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
