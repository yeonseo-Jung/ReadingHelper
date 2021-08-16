package com.forweber.backend;

import com.forweber.backend.domain.User;
import com.forweber.backend.repository.UserRepository;
import com.forweber.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import javax.transaction.Transactional;

@SpringBootTest
@Transactional
public class UserServiceTest {
    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    @Test
    @Commit
    void 회원가입(){
        User user = new User();
        user.setName("test_user");
        user.setEmail("email@gmail.com");
        user.setPassword("1234");
        userRepository.save(user);
    }
}
