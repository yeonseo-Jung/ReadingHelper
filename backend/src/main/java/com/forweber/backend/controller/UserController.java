package com.forweber.backend.controller;

import com.forweber.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // Redirect URL을 통해 프론트로부터 인자 코드를 받음
    @GetMapping("/login/callback/kakao")
    public void oauthKakao(@RequestParam("code") String code) throws Exception {
        userService.oauthKakao(code);
    }
}