package com.hotel.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

@Table(name = "hotel_booking_services") 
public class BookingService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "booking_service_id") 
    private Long id;

    private Integer quantity;
    private BigDecimal pricePerUnit;
    private BigDecimal totalPrice;
    private LocalDate serviceDate;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private HotelService service;
}