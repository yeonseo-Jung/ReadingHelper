package com.forweber.backend.repository;

import com.forweber.backend.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaUserRepository implements UserRepository{
    private final EntityManager em;

    public JpaUserRepository(EntityManager em) {
        this.em = em;
    }

    @Transactional
    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        User user = em.find(User.class, id);
        return Optional.ofNullable(user);
    }

    // 카카오, 네이버 모두 같은 이메일일 수 있으므로 이메일과 소셜 타입으로 DB 저장 여부를 판단한다.
    @Override
    public Optional<User> findByEmail(String email, String social) {
        List<User> result = em.createQuery("select m from User m where m.email=:email and m.social=:social", User.class)
                .setParameter("email", email)
                .setParameter("social", social)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public Optional<User> findByPw(String email, String password) {
        List<User> result = em.createQuery("select m from User m where m.email=:email and m.password=:password", User.class)
                .setParameter("email", email)
                .setParameter("password", password)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<User> findAll() {
        return em.createQuery("select m from User m", User.class).getResultList();
    }
}
