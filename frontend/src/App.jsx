import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomDetails from "./pages/RoomDetails";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/book/:roomId" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
