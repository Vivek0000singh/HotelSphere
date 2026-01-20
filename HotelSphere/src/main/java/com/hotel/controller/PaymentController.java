package com.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotel.dto.PaymentRequestDTO;
import com.hotel.entity.Payment;
import com.hotel.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // ✅ POST /api/payments/pay
    @PostMapping("/pay")
    public ResponseEntity<Payment> makePayment(@RequestBody PaymentRequestDTO request) {
        Payment payment = paymentService.createPayment(
                request.getBookingId(),
                request.getAmount(),
                request.getPaymentMethod()
        );
        return ResponseEntity.ok(payment);
    }
}