package com.forweber.backend.controller;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/search")
//@RequiredArgsConstructor
public class kakaoApiController {
    @Value("${kakao.restApi}")
    private String API_KEY;

    @GetMapping()
    public String search(@RequestParam String query,@RequestParam String pageNum){
        System.out.println("apiKey:"+API_KEY);
        System.out.println("query: "+query);
        System.out.println("pageNum : "+pageNum);
        Mono<String> mono = WebClient.builder().baseUrl("https://dapi.kakao.com")
                .build().get().uri(builder->builder.path("/v3/search/book")
                .queryParam("query",query).queryParam("page",pageNum).build()
        )
        .header("Authorization","KakaoAK "+API_KEY)
        .exchangeToMono(response->{
            return response.bodyToMono(String.class);
        });
        String jsonData = mono.block();
        System.out.println(jsonData);
        try{
            JSONParser jsonParse = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParse.parse(jsonData);
            JSONArray bookArray = (JSONArray) jsonObj.get("documents");
            for(int i=0;i<bookArray.size();i++){
                JSONObject bookObj = (JSONObject) bookArray.get(i);
                System.out.println(bookObj.get("title"));
                System.out.println(bookObj.get("authors"));
            }

        }catch(ParseException e){
            e.printStackTrace();
        }
        return mono.block();
    }
}
