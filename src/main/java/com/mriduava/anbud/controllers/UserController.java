package com.mriduava.anbud.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.mriduava.anbud.entities.User;
import com.mriduava.anbud.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@RestController
public class UserController {
    final String CLIENT_ID = "381472079955-jah68q207j1o6hpsevb4u3niqc79ud81.apps.googleusercontent.com";
    final String CLIENT_SECRET = "K8f5M0PIq6PvubQYUWgwarh2";

    final String passwordSalt = "keyboard-kitten";

    @Autowired
    UserService userService;

    @Resource(name="authenticationManager")
    private AuthenticationManager authManager;

    @PostMapping("/storeauthcode")
    public String storeauthcode(@RequestBody String code, @RequestHeader("X-Requested-With") String encoding, HttpServletRequest req) {
        if (encoding == null || encoding.isEmpty()) {
            return "Error, wrong headers";
        }

        GoogleTokenResponse tokenResponse = null;
        try {
            tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance(),
                    "https://www.googleapis.com/oauth2/v4/token",
                    CLIENT_ID,
                    CLIENT_SECRET,
                    code,
                    "http://localhost:9000")
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        Long expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);

        GoogleIdToken idToken = null;
        try {
            idToken = tokenResponse.parseIdToken();
        } catch (IOException e) {
            e.printStackTrace();
        }
        GoogleIdToken.Payload payload = idToken.getPayload();

        String userId = payload.getSubject();

        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");

        String password = email + passwordSalt + userId;
        userService.registerUser(name, email, pictureUrl, password);
        securityLogin(email, password, req);
        return "OK";
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest req) {
        securityLogin(user.getEmail(), user.getPassword(), req);
        return ResponseEntity.ok("ok");
    }*/

    @GetMapping("/currentuser")
    public ResponseEntity<User> currentUser() {
        User user = userService.findCurrentUser();
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/auth/user")
    public User getUser(){
        return userService.findCurrentUser();
    }

    @PostMapping("/auth/register")
    public ResponseEntity<User> register(@RequestBody User user){
        var newuser = userService.registerUser(user.getName(), user.getEmail(), user.getPictureUrl(), user.getPassword());
        return ResponseEntity.ok(newuser);
    }

    private void securityLogin(String email, String password, HttpServletRequest req) {
        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(email, password);
        Authentication auth = authManager.authenticate(authReq);

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = req.getSession(true);
        session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
    }

}
