import axios from "axios";

class KakaoSearch {
  constructor(key) {
    this.kakao = axios.create({
      baseURL: "https://dapi.kakao.com",
      headers: {
        Authorization: `KakaoAK ${key}`,
      },
    });
  }
  async search(query) {
    console.log(query);
    const params = {
      query: query,
      sort: "accuracy",
      page: 1,
      size: 12,
    };
    console.log(params);
    const response = await this.kakao.get(
      "/v3/search/book", //
      { params }
    );
    console.log(response);
    return response;
  }
}

export default KakaoSearch;
