package com.forweber.backend.service;

import com.forweber.backend.domain.Library;
import com.forweber.backend.repository.BookRepository;

import java.util.List;
import java.util.Optional;

public class BookService {
    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public Long addLibrary(Library book){
        bookRepository.save(book);
        return book.getId();
    }

    // 가입된 유저인지(DB에 정보 있음) 판단
    public boolean isInLibrary(String isbn){
        if(bookRepository.findByIsbn(isbn)
                .isPresent()){
            return true;
        }
        return false;
    }
    public List<Library> loadLibrary(Long userId) { return bookRepository.findByUserId(userId); }
    public Optional<Library> findOne(Long userId) {return bookRepository.findById(userId);}
}
