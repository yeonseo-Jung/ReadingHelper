package com.forweber.backend.service;

import com.forweber.backend.domain.AuthKakao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthKakaoService authKakaoService;

    // 카카오로에 인자 코드를 넘겨서 token을 받음, token으로 유저 정보를 얻을 수 있음
    public void oauthKakao(String code) throws Exception {
        AuthKakao authorization = authKakaoService.callTokenApi(code);
        String userInfoFromKakao = authKakaoService.callGetUserByAccessToken(authorization.getAccess_token());
        System.out.println("userInfoFromKakao = " + userInfoFromKakao);
    }
}