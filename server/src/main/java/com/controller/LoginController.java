package com.controller;

import com.domain.AuthenticationResponse;
import com.domain.LoginDto;
import com.service.AuthenticationService;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
