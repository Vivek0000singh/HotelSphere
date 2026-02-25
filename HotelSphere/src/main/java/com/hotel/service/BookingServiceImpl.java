package com.hotel.service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dto.BookingRequestDTO;
import com.hotel.entity.Booking;
import com.hotel.entity.Room;
import com.hotel.entity.User;
import com.hotel.exception.ResourceNotFoundException;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, 
                              RoomRepository roomRepository, 
                              UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Booking createBooking(BookingRequestDTO request) {
        
        // 1.  Fetch Room with LOCK 
        Room room = roomRepository.findByIdWithLock(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        // 2. Check Availability 
        boolean isAvailable = roomRepository.isRoomAvailable(
                request.getRoomId(), 
                request.getCheckInDate(), 
                request.getCheckOutDate()
        );

        if (!isAvailable) {
            throw new IllegalStateException("Room is already booked for these dates!");
        }

        // 3. Proceed with Booking
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setBookingStatus("PENDING");

        // Price Calculation
        long nights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (nights < 1) nights = 1;

        
        BigDecimal pricePerNight = room.getRoomType().getBasePricePerNight(); 
        BigDecimal totalPrice = pricePerNight.multiply(BigDecimal.valueOf(nights));

        booking.setTotalAmount(totalPrice);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        booking.setBookingStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}