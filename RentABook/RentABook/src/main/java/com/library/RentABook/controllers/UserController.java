package com.library.RentABook.controllers;

import com.library.RentABook.entities.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    private List<User> registeredUsers = new ArrayList<>();

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (user.getUsername().equals("admin") && user.getPassword().equals("admin")) {
            registeredUsers.add(user);
            return "Registration successful";
        } else {
            return "Invalid credentials";
        }
    }
}
