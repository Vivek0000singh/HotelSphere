package com.hotel.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.hotel.entity.Booking;
import com.hotel.entity.Payment;
import com.hotel.exception.ResourceNotFoundException;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.PaymentRepository;
import com.hotel.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

 
    public PaymentServiceImpl(PaymentRepository paymentRepository, 
                              BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Payment createPayment(Long bookingId, BigDecimal amount, String method) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setPaymentMethod(method);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus("SUCCESS");

        Payment savedPayment = paymentRepository.save(payment);

        // Update booking status
        booking.setBookingStatus("PAID");
        bookingRepository.save(booking);

        return savedPayment;
    }
}