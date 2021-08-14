package com.forweber.backend.controller;

import com.forweber.backend.domain.AuthKakao;
import com.forweber.backend.service.AuthKakaoService;
import com.forweber.backend.service.AuthNaverService;
import com.forweber.backend.service.UserService;
import com.github.scribejava.core.model.OAuth2AccessToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @Autowired
    private final UserService userService;
    @Autowired
    private AuthKakaoService kakaoService;
    @Autowired
    private AuthNaverService naverService;

    // Redirect URL을 통해 프론트로부터 인자 코드를 받음
    @GetMapping("/login/callback/kakao")
    public HashMap<String, Object> callbackKakao(@RequestParam("code") String code) throws Exception {
        AuthKakao authorization = kakaoService.getAccessToken(code);
        System.out.println("controller access_token : " + authorization);

        HashMap<String, Object> userInfo = kakaoService.getUserInfo(authorization.getAccess_token());
        userInfo.put("access_token", authorization.getAccess_token());
        return userInfo;
    }

    @RequestMapping("/login/naver")
    public String loginNaver(HttpSession session) {

        // 네이버아이디로 인증 URL(로그인 페이지)을 생성하여 프론트에 넘겨줌
        String naverAuthUrl = naverService.getAuthorizationUrl(session);

        //https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sE***************&
        //redirect_uri=http%3A%2F%2F211.63.89.90%3A8090%2Flogin_project%2Fcallback&state=e68c269c-5ba9-4c31-85da-54c16c658125
        System.out.println(naverAuthUrl);
        return naverAuthUrl;
    }

    @RequestMapping("/login/callback/naver")
    public HashMap<String, Object> callbackNaver(@RequestParam("code") String code, @RequestParam("state") String state) throws Exception {
        //userService.oauthNaver(code, request, response);
//        log.info("log", code, request, session);
        //String state = naverService.getAuthorizationUrl();

        System.out.println(code+"   "+state);
        OAuth2AccessToken accessToken = naverService.getAccessToken(code, state);
        System.out.println(accessToken.getAccessToken());
//        return accessToken.getAccess_token();
        HashMap<String, Object> userInfo = naverService.getUserProfile(accessToken);
        userInfo.put("access_token", accessToken.getAccessToken());
        System.out.println("user info"+userInfo);
        return userInfo;
    }
}