package com.forweber.backend.controller;

import com.forweber.backend.domain.Library;
import com.forweber.backend.service.BookService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping()
public class LibraryController {
    @Autowired
    private BookService bookService;

    @PostMapping("/book_info")
    public void addLibrary(@RequestBody String query) {
        System.out.println(query);
        try{
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(query);
            jsonObj = (JSONObject)jsonObj.get("params");
            System.out.println(jsonObj.get("publisher").toString());
            System.out.println("translatorr : "+jsonObj.get("translator").toString());
            if(!bookService.isInLibrary(jsonObj.get("isbn").toString())){
                bookService.addLibrary(Library.builder()
                        .title(jsonObj.get("title").toString())
                        .author(jsonObj.get("author").toString())
                        .publisher(jsonObj.get("publisher").toString())
                        .translator(jsonObj.get("translator").toString())
                        .contents(jsonObj.get("contents").toString())
                        .thumbnail(jsonObj.get("thumbnail").toString())
                        .isbn(jsonObj.get("isbn").toString())
                        .user_id(jsonObj.get("userId").toString())
                        .build());
            }
        }catch(ParseException e){
            e.printStackTrace();
        }
    }
    @GetMapping("/mylib")
    public List<Library> loadLibrary(@RequestParam String id) {
        System.out.println(id);
        long uid = Long.parseLong(id);
        List<Library> lib = new ArrayList<Library>();
        lib = bookService.loadLibrary(uid);
        System.out.println("결과 출력 : "+lib);
        for(int i=0;i<lib.size();i++){
            Library book = lib.get(i);
            System.out.println(book);
            System.out.println(book.getTitle());
        }

        return lib;

    }
}
