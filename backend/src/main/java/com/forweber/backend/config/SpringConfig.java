package com.forweber.backend.config;

import com.forweber.backend.repository.JpaUserRepository;
import com.forweber.backend.repository.UserRepository;
import com.forweber.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class SpringConfig {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em){
        this.em = em;
    }

    @Bean
    public UserService userService() { return new UserService(userRepository());}

    @Bean
    public UserRepository userRepository() {
        return new JpaUserRepository(em);
    }
}
