import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AddServiceModal from "../components/AddServiceModal";
import PaymentModal from "../components/PaymentModal"; // 🔥 Import Payment Modal

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  // Selection State
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBookingForPay, setSelectedBookingForPay] = useState(null); // 🔥 Store full booking object

  const fetchMyBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const res = await api.get(`/bookings/user/${userId}`);
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  // 1. Handle Cancel
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel?")) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      alert("Booking Cancelled");
      fetchMyBookings();
    } catch (error) {
      alert("Failed to cancel");
    }
  };

  // 2. Open Payment Modal
  const handlePayClick = (booking) => {
    setSelectedBookingForPay(booking);
    setShowPayModal(true);
  };

  // 3. Open Order Food Modal
  const handleOrderService = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowServiceModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-success";
      case "PAID":
        return "bg-primary";
      case "CANCELLED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">My Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {bookings.map((b) => (
              <div className="col-md-6 mb-4" key={b.bookingId}>
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Room {b.room?.roomNumber}</h5>
                    <span
                      className={`badge ${getStatusBadge(b.bookingStatus)}`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>

                  <div className="card-body">
                    <p className="mb-1">
                      <strong>Check-In:</strong> {b.checkInDate}
                    </p>
                    <p className="mb-1">
                      <strong>Check-Out:</strong> {b.checkOutDate}
                    </p>
                    <p className="mb-3 fs-5">
                      <strong>Total:</strong> ₹{b.totalAmount || 0}
                    </p>

                    <div className="d-grid gap-2">
                      {/* Logic: If CONFIRMED -> Show Cancel & Pay */}
                      {b.bookingStatus === "CONFIRMED" && (
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleCancel(b.bookingId)}
                            className="btn btn-outline-danger flex-grow-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handlePayClick(b)} // 🔥 Click triggers modal
                            className="btn btn-primary flex-grow-1"
                          >
                            Pay Now
                          </button>
                        </div>
                      )}

                      {/* Logic: If PAID or CONFIRMED -> Show Order Food */}
                      {(b.bookingStatus === "CONFIRMED" ||
                        b.bookingStatus === "PAID") && (
                        <button
                          onClick={() => handleOrderService(b.bookingId)}
                          className="btn btn-warning fw-bold text-dark"
                        >
                          🍔 Order Food / Services
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service Modal */}
        {showServiceModal && (
          <AddServiceModal
            bookingId={selectedBookingId}
            onClose={() => setShowServiceModal(false)}
            onSuccess={fetchMyBookings}
          />
        )}

        {/* 🔥 Payment Modal */}
        {showPayModal && (
          <PaymentModal
            booking={selectedBookingForPay}
            onClose={() => setShowPayModal(false)}
            onSuccess={fetchMyBookings}
          />
        )}
      </div>
    </>
  );
};

export default MyBookings;
