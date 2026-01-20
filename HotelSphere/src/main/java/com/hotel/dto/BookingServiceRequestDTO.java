package com.hotel.dto;

import java.time.LocalDate;

import lombok.Data;

@Data

public class BookingServiceRequestDTO {
	   private Long bookingId;
	    private String roomNumber;     // 🔥 KEY FIELD
	    private Long serviceId;     // 🔥 REQUIRED
	    private int quantity;       // 🔥 REQUIRED
	    private LocalDate serviceDate;
}
