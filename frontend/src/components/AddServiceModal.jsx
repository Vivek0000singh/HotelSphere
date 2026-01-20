import React, { useState, useEffect } from "react";
import api from "../api/axios";

const AddServiceModal = ({ bookingId, onClose, onSuccess }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch Menu
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        // Debugging: Check console to ensure data has 'name' and 'serviceId'
        console.log("Menu Data:", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending Data to Backend
      await api.post(`/services/add-to-booking`, null, {
        params: {
          bookingId: bookingId,
          serviceId: selectedService,
          quantity: quantity,
        },
      });
      alert("Order Placed Successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add service.");
    }
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Room Service</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Item</label>
                <select
                  className="form-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                >
                  <option value="">-- Choose Item --</option>
                  {/* 🔥 FIX: Using correct variable names from your Backend */}
                  {services.map((s) => (
                    <option key={s.serviceId} value={s.serviceId}>
                      {s.name} - ₹{s.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
