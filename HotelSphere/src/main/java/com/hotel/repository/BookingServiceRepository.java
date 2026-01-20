package com.hotel.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hotel.entity.BookingService;

public interface BookingServiceRepository extends JpaRepository<BookingService, Long> {
    
    // ✅ NEW METHOD: Find all services linked to a specific Booking
    List<BookingService> findByBookingBookingId(Long bookingId);
}