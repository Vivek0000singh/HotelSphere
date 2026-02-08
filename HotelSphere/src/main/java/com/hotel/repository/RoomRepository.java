package com.hotel.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotel.entity.Room;

import jakarta.persistence.LockModeType;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByStatus(String status);

    // Get all available rooms (For search results)
    @Query("SELECT r FROM Room r WHERE r.roomId NOT IN (" +
           "  SELECT b.room.roomId FROM Booking b " +
           "  WHERE b.bookingStatus <> 'CANCELLED' " +
           "  AND ((b.checkInDate <= :checkOut) AND (b.checkOutDate >= :checkIn))" +
           ")")
    List<Room> findAvailableRooms(
        @Param("checkIn") LocalDate checkIn, 
        @Param("checkOut") LocalDate checkOut
    );
    
    //  NEW: Helper to quickly check availability for ONE room
    @Query("SELECT COUNT(b) = 0 FROM Booking b " +
           "WHERE b.room.roomId = :roomId " +
           "AND b.bookingStatus <> 'CANCELLED' " +
           "AND ((b.checkInDate <= :checkOut) AND (b.checkOutDate >= :checkIn))")
    boolean isRoomAvailable(
        @Param("roomId") Long roomId,
        @Param("checkIn") LocalDate checkIn, 
        @Param("checkOut") LocalDate checkOut
    );

    // FIX: PESSIMISTIC_WRITE Lock (Used r.roomId instead of r.id for consistency)
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM Room r WHERE r.roomId = :id")
    Optional<Room> findByIdWithLock(@Param("id") Long id);
}