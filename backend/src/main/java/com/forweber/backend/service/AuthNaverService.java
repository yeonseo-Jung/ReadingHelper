package com.forweber.backend.service;

import java.io.*;
import java.util.HashMap;
import java.util.UUID;
import javax.servlet.http.HttpSession;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forweber.backend.config.NaverLoginApi;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AuthNaverService {
    /* 인증 요청문을 구성하는 파라미터 */
    //client_id: 애플리케이션 등록 후 발급받은 클라이언트 아이디
    //response_type: 인증 과정에 대한 구분값. code로 값이 고정돼 있습니다.
    //redirect_uri: 네이버 로그인 인증의 결과를 전달받을 콜백 URL(URL 인코딩). 애플리케이션을 등록할 때 Callback URL에 설정한 정보입니다.
    //state: 애플리케이션이 생성한 상태 토큰
    private final static String CLIENT_ID = "nJjdaeGywcEggORE26DV";
    private final static String CLIENT_SECRET = "BobP53DEKQ";
    private final static String REDIRECT_URI = "http://localhost:3000/login/callback/naver";
    private final static String SESSION_STATE = "oauth_state";
    /* 프로필 조회 API URL */
    private final static String PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

//    public AuthNaver getAccessToken(String code, String state) throws Exception {
//        String grantType = "authorization_code";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", CLIENT_ID);
//        params.add("client_secret", CLIENT_SECRET);
//        params.add("code", code);
//        params.add("state", state);
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params);
//
//        String url = "https://nid.naver.com/oauth2.0/token?";
//        try {
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//
//            AuthNaver authorization = objectMapper.readValue(response.getBody(), AuthNaver.class);
//            System.out.println("auths: " + response.getBody().toString());
//            return authorization;
//        } catch (RestClientException | JsonProcessingException ex) {
//            ex.printStackTrace();
//            throw new RestClientException(ex.getMessage());
//        }
//    }
//
//    public String getAccessToken (String code, String state) {
//        String access_Token = "";
//        String refresh_Token = "";
//        String reqURL = "https://nid.naver.com/oauth2.0/token?";
//
//        try {
//            URL url = new URL(reqURL);
//
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            //  URL연결은 입출력에 사용 될 수 있고, POST 혹은 PUT 요청을 하려면 setDoOutput을 true로 설정해야함.
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//
//            //	POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id="+CLIENT_ID);  //본인이 발급받은 key
//            sb.append("&client_secret="+CLIENT_SECRET);     // 본인이 설정해 놓은 경로
//            sb.append("&code=" + code);
//            sb.append("&state=" + state);
//            bw.write(sb.toString());
//            bw.flush();
//
//            //    결과 코드가 200이라면 성공
//            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);
//
//            //    요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            String result = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println("response body : " + result);
//
//            //    Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            access_Token = element.getAsJsonObject().get("access_token").getAsString();
//            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
//
//            System.out.println("access_token : " + access_Token);
//            System.out.println("refresh_token : " + refresh_Token);
//
//            br.close();
//            bw.close();
//        } catch (IOException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//
//        return access_Token;
//    }
public String getAuthorizationUrl(HttpSession session) {

    /* 세션 유효성 검증을 위하여 난수를 생성 */
    String state = generateRandomString();
    /* 생성한 난수 값을 session에 저장 */
    setSession(session,state);

    /* Scribe에서 제공하는 인증 URL 생성 기능을 이용하여 네아로 인증 URL 생성 */
    OAuth20Service oauthService = new ServiceBuilder()
            .apiKey(CLIENT_ID)
            .apiSecret(CLIENT_SECRET)
            .callback(REDIRECT_URI)
            .state(state) //앞서 생성한 난수값을 인증 URL생성시 사용함
            .build(NaverLoginApi.instance());

    return oauthService.getAuthorizationUrl();
}

    //    /* 네이버아이디로 Callback 처리 및 AccessToken 획득 Method */
    public OAuth2AccessToken getAccessToken(String code, String state) throws IOException {
        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(CLIENT_ID)
                .apiSecret(CLIENT_SECRET)
                .callback(REDIRECT_URI)
                .state(state)
                .build(NaverLoginApi.instance());

        // Scribe에서 제공하는 AccessToken 획득 기능으로 네아로 Access Token을 획득
        OAuth2AccessToken accessToken = oauthService.getAccessToken(code);

        return accessToken;
    }

    /* 세션 유효성 검증을 위한 난수 생성기 */
    private String generateRandomString() {
        return UUID.randomUUID().toString();
    }

    /* http session에 데이터 저장 */
    private void setSession(HttpSession session, String state) {
        session.setAttribute(SESSION_STATE, state);
    }


    /* Access Token을 이용하여 네이버 사용자 프로필 API를 호출 */
    public HashMap<String, Object> getUserProfile(OAuth2AccessToken oauthToken) throws IOException{
        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(CLIENT_ID)
                .apiSecret(CLIENT_SECRET)
                .callback(REDIRECT_URI).build(NaverLoginApi.instance());
        OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
        oauthService.signRequest(oauthToken, request);
        Response response = request.send();

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(response.getBody());
        System.out.println("id "+element);
        JsonObject properties = element.getAsJsonObject().get("response").getAsJsonObject();

        String id = properties.getAsJsonObject().get("id").getAsString();
        HashMap<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", id);
        return userInfo;
    }
}