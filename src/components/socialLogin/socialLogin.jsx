import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { socialLogin } from "../../actions/auth";
import LoadSpinner from "../common/loadSpinner/loadSpinner";
import styles from "./socialLogin.module.css";
const SocialLogin = ({ type }) => {
  const history = useHistory();
  const url = new URL(window.location.href);
  // 인가 코드
  const authorizationCode = url.searchParams.get("code");
  // 네이버는 사이트 간 요청 위조 공격을 방지하기 위해 상태 토큰값에 URL 인코딩을 적용한 state를 백엔드에 꼭 넘겨주어야 함
  const state = url.searchParams.get("state") || "";
  const dispatch = useDispatch();
  useEffect(() => {
    if (authorizationCode) {
      // 백엔드와 통신하는 handler 함수
      if (type === "naver") {
      }
      dispatch(
        socialLogin({
          type,
          params: { code: authorizationCode, state },
        })
      )
        .then((res) => {
          console.log("user:", res);
          /*
						user =
						{
							access_token: "",
							name: "",
							email: "" 
						}
					*/
          setTimeout(() => {
            history.push("/");
          }, 500);
        })
        .catch((err) => {
          console.error("requestToken error:", err);
        });
    }
  }, []);

  return (
    <div className={styles.socialLogin}>
      <LoadSpinner />
    </div>
  );
};

export default SocialLogin;
