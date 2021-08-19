package com.forweber.backend.repository;


import com.forweber.backend.domain.Library;

import java.util.List;
import java.util.Optional;

public interface BookRepository {
    Library save(Library book);
    Optional<Library> findById(Long id);
    Optional<Library> findByIsbn(String isbn);
    List<Library> findByUserId(Long id); //user id로 내 서재 조회
    List<Library> findAll();
}
