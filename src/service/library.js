import axios from "axios";

class Library {
  constructor(uid) {
    this.library = axios.create({
      baseURL: "http://localhost:3000",
      params: {
        id: uid,
      },
    });
  }
  async loadLibrary() {
    const response = await axios.get("/mylib");
    return response;
  }
}

export default Library;
