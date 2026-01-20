package com.hotel.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hotel.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // ✅ Find all payments linked to a specific Booking
    List<Payment> findByBookingBookingId(Long bookingId);
}