import React, { useState } from "react";
import api from "../../api/axios";

const AddTypeForm = ({ onSuccess }) => {
  const [newType, setNewType] = useState({
    name: "",
    basePricePerNight: "",
    description: "",
    maxOccupancy: 2,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/room-types", newType);
      alert("Type Added!");
      setNewType({
        name: "",
        basePricePerNight: "",
        description: "",
        maxOccupancy: 2,
      });
      onSuccess();
    } catch (error) {
      alert("Failed to add type.");
    }
  };

  return (
    <div className="card shadow-sm border-0" style={{ maxWidth: "600px" }}>
      <div className="card-body">
        <h5 className="mb-3">Create New Room Type</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={newType.name}
              onChange={(e) => setNewType({ ...newType, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              value={newType.basePricePerNight}
              onChange={(e) =>
                setNewType({ ...newType, basePricePerNight: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTypeForm;
