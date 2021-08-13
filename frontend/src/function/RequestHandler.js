// 백엔드에게 access_token 및 사용자 정보를 얻기 위해 GET 요청을 보내는 함수
import axios from 'axios';

export default function RequestHandler(props) {
	/*
        인가 코드를 백엔드에 전달하는 callback 요청시 작업: access_token과 사용자 정보가 리턴 됨
        params 필수 인자: 네이버(code, state) 카카오(code)
    */
	if (props.path) {
		return axios({
			method: 'GET',
			url: `http://localhost:8080/login/callback/${props.path}`,
			params: props.params,
		});
	}

	/*
        네이버의 로그인 url 요청시의 작업 (네이버는 백엔드로 url을 요청해야한다.)
        네이버 로그인 페이지로 이동, history를 사용하면 invalid hook call 에러가 생겨서 href로 대신하였습니다.
    */
	axios({
		method: 'GET',
		url: 'http://localhost:8080/login/naver',
	})
		.then((res) => {
			console.log('requestToken:', res.data);
			window.location.href = `${res.data}`;
		})
		.catch((err) => {
			console.error('requestToken error:', err);
		});
}
