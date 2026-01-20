package com.hotel.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.entity.RoomType;
import com.hotel.repository.RoomTypeRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/room-types")
@RequiredArgsConstructor
public class RoomTypeController {

    private final RoomTypeRepository roomTypeRepository;

    // ✅ 1. Allow Admin to create a new Type with a PRICE
    @PostMapping
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) {
        return ResponseEntity.ok(roomTypeRepository.save(roomType));
    }

    // ✅ 2. Get all types (for the dropdown in Admin Panel)
    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(roomTypeRepository.findAll());
    }
}