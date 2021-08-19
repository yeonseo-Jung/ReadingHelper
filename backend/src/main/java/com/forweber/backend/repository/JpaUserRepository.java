package com.forweber.backend.repository;

import com.forweber.backend.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
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

    @Override
    public Long findUserId(String email, String social) {
        System.out.println("유저 아이디 가져오기");
        System.out.println(email+" "+social);
        User obj = new User();

        try {
            obj = em.createQuery("select m from User m where m.email=:email and m.social=:social", User.class)
                    .setParameter("email", email)
                    .setParameter("social", social).getSingleResult();
        }catch(NoResultException e ){
            System.out.println("오류 - No Result Exception");
        }
        return obj.getId();
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
    public List<User> findAll() {
        return em.createQuery("select m from User m", User.class).getResultList();
    }
}
