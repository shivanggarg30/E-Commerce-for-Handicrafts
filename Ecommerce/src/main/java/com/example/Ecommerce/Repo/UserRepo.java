package com.example.Ecommerce.Repo;

import com.example.Ecommerce.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository <UserModel , String>  {
    Optional<UserModel> findByEmail(String email);
}
