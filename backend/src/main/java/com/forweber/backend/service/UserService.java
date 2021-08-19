package com.forweber.backend.service;
import com.forweber.backend.domain.User;
import com.forweber.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Long join(User user){
        userRepository.save(user);
        return user.getId();
    }

    // 가입된 유저인지(DB에 정보 있음) 판단
    public boolean isSignedUser(String email, String social){
        if(userRepository.findByEmail(email, social)
                .isPresent()){
            return true;
        }
        return false;
    }

    public Long findId(String email,String social){return userRepository.findUserId(email,social);}

    public List<User> findUsers() { return userRepository.findAll(); }
    public Optional<User> findOne(Long userId) {return userRepository.findById(userId);}
}