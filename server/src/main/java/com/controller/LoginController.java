package com.controller;

import com.domain.AuthenticationResponse;
import com.domain.LoginDto;
import com.domain.RegisterRequest;
import com.service.AuthenticationService;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationService service;

    @CrossOrigin
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody LoginDto request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    /*@PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }*/
}
