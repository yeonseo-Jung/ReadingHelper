package com.forweber.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "translator")
    private String translator;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "contents")
    private String contents;
    @Column(name = "thumbnail")
    private String thumbnail;
    @Column(name = "userId")
    private String userId;
}
