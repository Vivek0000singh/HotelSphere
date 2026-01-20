import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

// Import smaller components
import AdminBookings from "../components/admin/AdminBookings";
import AdminRoomList from "../components/admin/AdminRoomList";
import AddRoomForm from "../components/admin/AddRoomForm";
import AddTypeForm from "../components/admin/AddTypeForm";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch All Data
  const fetchData = async () => {
    try {
      const [bookingRes, typeRes, roomRes] = await Promise.all([
        api.get("/bookings/all"),
        api.get("/room-types"),
        api.get("/rooms"),
      ]);
      setBookings(bookingRes.data);
      setRoomTypes(typeRes.data);
      setRooms(roomRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Delete Handler
  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${roomId}`);
      fetchData();
    } catch (error) {
      alert("Could not delete room.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              All Bookings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "rooms" ? "active" : ""}`}
              onClick={() => setActiveTab("rooms")}
            >
              Manage Rooms
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "addType" ? "active" : ""}`}
              onClick={() => setActiveTab("addType")}
            >
              Add Room Type
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "addRoom" ? "active" : ""}`}
              onClick={() => setActiveTab("addRoom")}
            >
              Add Room
            </button>
          </li>
        </ul>

        {/* CONTENT AREA - Clean & Modular */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "bookings" && <AdminBookings bookings={bookings} />}

            {activeTab === "rooms" && (
              <AdminRoomList rooms={rooms} onDelete={handleDeleteRoom} />
            )}

            {activeTab === "addType" && <AddTypeForm onSuccess={fetchData} />}

            {activeTab === "addRoom" && (
              <AddRoomForm roomTypes={roomTypes} onSuccess={fetchData} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
