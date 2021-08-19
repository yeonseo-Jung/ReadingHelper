package com.forweber.backend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table
public class Library {
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
    @Column(name = "isbn")
    private String isbn;
    @Column(name = "userId")
    private String user_id;

    @Builder
    public Library(String title,String author,String translator,String publisher, String contents,String thumbnail,String isbn,String user_id){
        this.title = title;
        this.author=author;
        this.translator = translator;
        this.publisher=publisher;
        this.contents = contents;
        this.thumbnail=thumbnail;
        this.isbn = isbn;
        this.user_id=user_id;
    }
}
