import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

// Helper: Rotates images based on Room ID so they don't all look the same
const getRoomImage = (roomType, roomId) => {
  const type = roomType?.toLowerCase() || "";
  const id = roomId || 1;

  // List of Luxury/Deluxe Images
  const luxuryImages = [
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
  ];

  // Specific image for Suites
  if (type.includes("suite")) {
    return "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000";
  }

  // Use the ID to pick an image from the list
  return luxuryImages[id % luxuryImages.length];
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hooks for Navigation and URL params
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 1. Fetch Rooms (Either All or Available)
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        // Get params from URL (e.g., ?checkIn=2024-01-01)
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
        const type = searchParams.get("type");

        let res;

        // 🔥 LOGIC: If dates exist, use Search API. Otherwise, get All Rooms.
        if (checkIn && checkOut) {
          console.log("Searching for available rooms...");
          // Call the 'Available' endpoint we just built
          res = await api.get(
            `/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${type || ""}`,
          );
        } else {
          console.log("Fetching all rooms...");
          // Call the standard 'All Rooms' endpoint
          res = await api.get("/rooms");
        }

        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [searchParams]); // Re-run this whenever URL changes

  // 2. Handle "View Details" Click
  const handleBookNow = (roomId) => {
    // Grab the dates currently in the URL
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    // Start building the target URL
    let targetUrl = `/book/${roomId}`;

    // If we have dates, attach them to the next URL!
    if (checkIn && checkOut) {
      targetUrl += `?checkIn=${checkIn}&checkOut=${checkOut}`;
    }

    // Go to Booking Page
    navigate(targetUrl);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Accommodations</h2>
          <p className="text-muted">
            {searchParams.get("checkIn")
              ? `Showing available rooms from ${searchParams.get("checkIn")} to ${searchParams.get("checkOut")}`
              : "Select from our wide range of premium rooms"}
          </p>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center mt-5">
            <div className="alert alert-warning d-inline-block px-5">
              <h4>No rooms available.</h4>
              <p className="mb-0">Try changing your dates or room type.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {rooms.map((room) => (
              <div className="col-md-4 mb-4" key={room.roomId}>
                <div className="card shadow border-0 h-100 transition-hover">
                  {/* Dynamic Image */}
                  <img
                    src={getRoomImage(room.roomType?.name, room.roomId)}
                    className="card-img-top"
                    alt={room.roomType?.name || "Room"}
                    style={{ height: "250px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold mb-0">
                        {room.roomType
                          ? room.roomType.name
                          : `Room ${room.roomNumber}`}
                      </h5>
                      <span className="badge bg-primary px-3 py-2">
                        ₹{room.roomType?.basePricePerNight || "0"} / night
                      </span>
                    </div>

                    <p className="text-muted small mb-2">
                      Room No: {room.roomNumber} • Floor: {room.floor}
                    </p>

                    <p className="card-text text-secondary">
                      {room.roomType?.description ||
                        "Experience luxury and comfort."}
                    </p>

                    {/* Button that carries dates to the next page */}
                    <button
                      onClick={() => handleBookNow(room.roomId)}
                      className="btn btn-outline-primary w-100 mt-auto"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Rooms;
