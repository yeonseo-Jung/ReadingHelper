package com.forweber.backend.repository;

import com.forweber.backend.domain.Library;
import com.forweber.backend.domain.User;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class JpaBookRepository implements BookRepository {
    private final EntityManager em;

    public JpaBookRepository(EntityManager em) {
        this.em = em;
    }

    @Transactional
    @Override
    public Library save(Library book) {
        em.persist(book);
        return book;
    }

    @Override
    public Optional<Library> findById(Long id) {
        Library user = em.find(Library.class, id);
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<Library> findByIsbn(String isbn) {
        List<Library> result = em.createQuery("select m from Library m where m.isbn=:isbn", Library.class)
                .setParameter("isbn", isbn)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<Library> findByUserId(Long id) {
        String jpql="select m from Library m where user_id="+id;
        return em.createQuery(jpql, Library.class).getResultList();
    }

    @Override
    public List<Library> findAll() {
        return em.createQuery("select m from Library m", Library.class).getResultList();
    }
}
