package com.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates Getters, Setters, toString, etc.
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    private String fullName;
    private String email;
    private String password;
    private String role;
}