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

    // 카카오 로그인: Redirect URL을 통해 프론트로부터 인자 코드를 받고 검증
    @RequestMapping("/login/callback/kakao")
    public HashMap<String, String> callbackKakao(@RequestParam("code") String code) throws Exception {
        AuthKakao authorization = kakaoService.getAccessToken(code);
        System.out.println("controller accessToken : " + authorization);

        HashMap<String, String> userInfo = kakaoService.getUserInfo(authorization.getAccess_token());
        userInfo.put("accessToken", authorization.getAccess_token());

        // DB에 등록된 이메일이 없다면 새로 가입
        signIn(userInfo, "kakao");

        return userInfo;
    }

    // 네이버 로그인 페이지 URL을 프론트에 전송
    @RequestMapping("/login/callback/naverUrl")
    public String loginNaver(HttpSession session) {

        // 네이버아이디로 인증 URL(로그인 페이지)을 생성하여 프론트에 넘겨줌
        String naverAuthUrl = naverService.getAuthorizationUrl(session);

        //https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sE***************&
        //redirect_uri=http%3A%2F%2F211.63.89.90%3A8090%2Flogin_project%2Fcallback&state=e68c269c-5ba9-4c31-85da-54c16c658125
        System.out.println(naverAuthUrl);
        return naverAuthUrl;
    }

    // 네이버 로그인: naverAuthUrl 페이지에서 로그인 후 프론트로부터 인자 코드를 받고 검증
    @RequestMapping("/login/callback/naver")
    public HashMap<String, String> callbackNaver(@RequestParam("code") String code, @RequestParam("state") String state) throws Exception {
        OAuth2AccessToken accessToken = naverService.getAccessToken(code, state);
        HashMap<String, String> userInfo = naverService.getUserProfile(accessToken);
        userInfo.put("accessToken", accessToken.getAccessToken());

        signIn(userInfo, "naver");
        System.out.println("naver: "+ userInfo);
        return userInfo;
    }

    // 자체 회원 가입
    @RequestMapping("/login/callback/own/sign")
    public HashMap<String, String> signOwn(@RequestParam("type") String type, @RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("password") String pw){
        HashMap<String, String> userInfo = new HashMap<String, String>();
        System.out.println("type" + type);
        userInfo.put("name", name);
        userInfo.put("email", email);
        // 네이버, 카카오와의 DB 형식 통일을 위해 비밀번호를 accessToken으로 저장합니다.
        userInfo.put("accessToken", pw);
        System.out.println("userinfo" + name + email + pw);
        // 이미 가입된 이메일이라면
        if (!signIn(userInfo, "own")) {
            userInfo.clear();
            userInfo.put("response", "duplicated");
        }
        return userInfo;

    }

    // 자체 로그인
    @RequestMapping("/login/callback/own")
    public HashMap<String, String> loginOwn(@RequestParam("type") String type, @RequestParam("email") String email, @RequestParam("password") String pw){
        HashMap<String, String> userInfo = new HashMap<String, String>();
        System.out.println("type: " + type);
        // JWT 구현이 안되어서 지금은 무조건 유저 정보: {임의 이름, 이메일, 임의 access token}를 넘겨줍니다.
        userInfo.put("name", "사용자");
        userInfo.put("email", email);
        userInfo.put("accessToken", "forweber_token");
        /*
        여기서부터는 DB 연동 필요해서 주석처리!
        
        // 유저의 이메일, 비밀번호가 DB에 있는지 확인:
        User user = userService.checkLogin(email, pw);
        System.out.println("userinfo: " + user);

        // 유저가 DB에 있다면 로그인 성공이므로 유저 정보를 프론트에 넘겨준다.
        // !!JWT 발급해서 userInfo.put(jwt토큰) 저장하고 userInfo를 프론트에 넘겨주어야 합니다!
        if(user != null){
            userInfo.put("name", user.getName());
            userInfo.put("email", email);
        }else{
        // 로그인 또는 비밀번호가 틀렸음을 프론트에 넘겨줌
            userInfo.put("response", "invalidate");
        }
            */
        return userInfo;
    }

    @GetMapping("/userInfo")
    private Long getUserID(@RequestParam String email,@RequestParam String social){
        return userService.findId(email,social);
    }

    private boolean signIn(HashMap<String, String> userInfo, String social){
        // DB에 등록된 이메일이 없다면 새로 가입
        if(!userService.isSignedUser(userInfo.get("email"), social)){
            User user = new User();
            user.setName(userInfo.get("name"));
            user.setEmail(userInfo.get("email"));
            user.setPassword(userInfo.get("accessToken"));
            user.setSocial(social);
            userService.join(user);
            return true;
        }else{
            return false;
        }
    }
}