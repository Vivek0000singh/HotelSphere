package com.hotel.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.dto.BookingRequestDTO; // You might need to create this DTO
import com.hotel.entity.Booking;
import com.hotel.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // ✅ 1. CREATE BOOKING (Fixes "No static resource" error)
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDTO bookingRequest) {
        Booking newBooking = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(newBooking);
    }

    // ✅ 2. GET ALL BOOKINGS (For Admin Panel)
    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // ✅ 3. GET USER BOOKINGS (Fixes "Room Undefined" in My Bookings)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    // ✅ 4. CANCEL BOOKING
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
}