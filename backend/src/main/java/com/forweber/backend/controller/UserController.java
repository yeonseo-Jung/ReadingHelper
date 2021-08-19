package com.forweber.backend.controller;

import com.forweber.backend.domain.User;
import com.forweber.backend.domain.AuthKakao;
import com.forweber.backend.repository.UserRepository;
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
    @Autowired private UserRepository userRepository;
    @Autowired private UserService userService;
    @Autowired private AuthKakaoService kakaoService;
    @Autowired private AuthNaverService naverService;

    // Redirect URL을 통해 프론트로부터 인자 코드를 받음
    @GetMapping("/login/callback/kakao")
    public HashMap<String, String> callbackKakao(@RequestParam("code") String code) throws Exception {
        AuthKakao authorization = kakaoService.getAccessToken(code);
        System.out.println("controller access_token : " + authorization);

        HashMap<String, String> userInfo = kakaoService.getUserInfo(authorization.getAccess_token());
        userInfo.put("access_token", authorization.getAccess_token());

        // DB에 등록된 이메일이 없다면 새로 가입
        signIn(userInfo, "kakao");

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
    public HashMap<String, String> callbackNaver(@RequestParam("code") String code, @RequestParam("state") String state) throws Exception {
        OAuth2AccessToken accessToken = naverService.getAccessToken(code, state);
        HashMap<String, String> userInfo = naverService.getUserProfile(accessToken);
        userInfo.put("access_token", accessToken.getAccessToken());

        signIn(userInfo, "naver");

        return userInfo;
    }

    @GetMapping("/userInfo")
    private Long getUserID(@RequestParam String email,@RequestParam String social){
        System.out.println(email);
        System.out.println(social);
        userService.findId(email,social);
        return userService.findId(email,social);
    }

    private void signIn(HashMap<String, String> userInfo, String social){
        // DB에 등록된 이메일이 없다면 새로 가입
        if(!userService.isSignedUser(userInfo.get("email"), social)){
            User user = new User();
            user.setName(userInfo.get("name"));
            user.setEmail(userInfo.get("email"));
            user.setPassword(userInfo.get("access_token"));
            user.setSocial(social);
            userService.join(user);
        }
    }
}