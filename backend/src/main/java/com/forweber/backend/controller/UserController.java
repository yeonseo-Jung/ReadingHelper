package com.forweber.backend.controller;

import com.forweber.backend.domain.AuthKakao;
import com.forweber.backend.service.AuthKakaoService;
import com.forweber.backend.service.AuthNaverService;
import com.forweber.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    public HashMap<String, Object> loginKakao(@RequestParam("code") String code) throws Exception {
        AuthKakao authorization = kakaoService.getAccessToken(code);
        System.out.println("controller access_token : " + authorization);

        HashMap<String, Object> userInfo = kakaoService.getUserInfo(authorization.getAccess_token());
        userInfo.put("access_token", authorization.getAccess_token());
        userInfo.put("refresh_token", authorization.getRefresh_token());
        return userInfo;
    }

    @RequestMapping("/login/callback/naver")
    public void loginNaver(@RequestParam("code") String code) throws Exception {
        //userService.oauthNaver(code, request, response);
//        log.info("log", code, request, session);


    }
}