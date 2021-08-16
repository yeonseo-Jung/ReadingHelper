package com.forweber.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forweber.backend.domain.AuthKakao;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthKakaoService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // 카카오 js 키값
    private final String kakaoOauth2ClinetId = "8c11f2500a76e9aeaf3d42141179f84c";
    private final String frontendRedirectUrl = "http://localhost:3000";

    // 인가 코드를 카카오에게 넘겨서 토큰을 받아오는 함수
        public AuthKakao getAccessToken(String code) throws Exception {
        String grantType = "authorization_code";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", kakaoOauth2ClinetId);
        params.add("redirect_uri", frontendRedirectUrl + "/login/callback/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kauth.kakao.com/oauth/token";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            AuthKakao authorization = objectMapper.readValue(response.getBody(), AuthKakao.class);
            return authorization;
        } catch (RestClientException | JsonProcessingException ex) {
            ex.printStackTrace();
            throw new RestClientException(ex.getMessage());
        }
    }

    // 카카오로 받은 토큰을 이용하여 유저 정보를 얻는 함수
    public HashMap<String, String> getUserInfo (String access_Token) {

        //    요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, String> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.put("name", nickname);
            userInfo.put("email", email);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return userInfo;
    }
}