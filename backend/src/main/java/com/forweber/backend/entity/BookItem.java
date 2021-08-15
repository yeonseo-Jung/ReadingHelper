package com.forweber.backend.entity;

public class BookItem {
    private String img;
    private String title;
    private String author;
    private String contents;

    public BookItem(String img,String title,String author,String contents){
        this.img=img;
        this.title=title;
        this.author=author;
        this.contents=contents;
    }
}
