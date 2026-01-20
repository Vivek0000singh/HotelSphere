package com.hotel.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotel.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // ✅ ADD THIS LINE to fix the red error in your Service
    List<Room> findByStatus(String status);

    // (Keep your existing search query below if you have it)
    @Query("SELECT r FROM Room r WHERE r.roomId NOT IN (" +
           "  SELECT b.room.roomId FROM Booking b " +
           "  WHERE b.bookingStatus <> 'CANCELLED' " +
           "  AND ((b.checkInDate <= :checkOut) AND (b.checkOutDate >= :checkIn))" +
           ")")
    List<Room> findAvailableRooms(
        @Param("checkIn") LocalDate checkIn, 
        @Param("checkOut") LocalDate checkOut
    );
}