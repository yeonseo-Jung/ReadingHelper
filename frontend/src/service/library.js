import axios from "axios";

class Library {
  constructor() {
    this.library = axios.create({
      baseURL: "http://localhost:8080",
    });
  }

  async loadLibrary() {
    const response = await this.library.get("/mylib", { params: { id: 1 } });
    return response;
  }
  async loadCalendar() {
    const response = await this.library.get("/calendar", { params: { id: 1 } });
    return response;
  }
  async saveBook(book) {
    const response = await this.library.post("/book_info", {
      params: book,
    });
    return response;
  }
  async saveCalendar() {}
}

export default Library;
