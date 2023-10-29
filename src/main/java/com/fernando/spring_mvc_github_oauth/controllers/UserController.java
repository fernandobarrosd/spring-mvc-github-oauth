package com.fernando.spring_mvc_github_oauth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User oAuth2User) {
        return ResponseEntity.ok().body(oAuth2User.getAttributes());
    } 
}
