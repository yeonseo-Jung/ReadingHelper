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

    // 등록된 이메일과 패스워드가 맞는지 확인
    public User checkLogin(String email, String password){
        if(userRepository.findByPw(email, password)
            .isPresent()) {
            return userRepository.findByPw(email, password).get();
        }
        return null;
    }
    public Long findId(String email,String social){return userRepository.findUserId(email,social);}

    public List<User> findUsers() { return userRepository.findAll(); }
    public Optional<User> findOne(Long userId) {return userRepository.findById(userId);}
}