import React, { useState } from "react";
import styles from "./app.module.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calendar from "./pages/calendar/calendar";
import Home from "./pages/home/home";
import Library from "./pages/myLibrary/myLibrary";
import Report from "./pages/report/report";
import Header from "./components/header/header";
import SearchResult from "./pages/search/search";
import BookDetail from "./pages/bookDetail/bookDetail";

const App = ({ kakaoSearch }) => {
  const [word, setWord] = useState("");
  const [books, setBooks] = useState([]);

  const onSearch = async (query, page) => {
    setWord(query);
    await kakaoSearch
      .search(query, page) //
      .then((books) => {
        setBooks(books.data.documents);
      });
  };
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Header onSearch={onSearch} />
        <div className={styles.pages}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/library">
              <Library />
            </Route>
            <Route exact path="/report">
              <Report />
            </Route>
            <Route exact path="/calendar">
              <Calendar />
            </Route>
            <Route exact path="/search">
              <SearchResult query={word} books={books} onSearch={onSearch} />
            </Route>
            <Route exact path="/detail">
              <BookDetail />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route
              path="/login/callback/naver/"
              render={() => <SocialLogin type="naver" />}
            />
            <Route
              path="/login/callback/kakao/"
              render={() => <SocialLogin type="kakao" />}
            />
            <Route exact path="/join">
              <Join />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
