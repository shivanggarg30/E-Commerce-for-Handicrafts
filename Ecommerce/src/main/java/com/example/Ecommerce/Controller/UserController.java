package com.example.Ecommerce.Controller;

import com.example.Ecommerce.Models.UserModel;
import com.example.Ecommerce.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class UserController {

    @Autowired
    public UserRepo userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModel user){
        Optional<UserModel> check = userRepo.findByEmail(user.getEmail());
        if(check.isEmpty()){
            return ResponseEntity.badRequest().body("cant find user");
        }
        else if ( check.get().getPassword().equals(user.getPassword()) ) {
            return ResponseEntity.ok().body("User Found");
        }
        return ResponseEntity.ok().body("Done");
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody UserModel user ){
        return ResponseEntity.ok(userRepo.save(user));
    }

}
