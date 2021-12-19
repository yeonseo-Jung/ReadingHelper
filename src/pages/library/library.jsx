import React, { useEffect, useState } from "react";
import BookList from "../../components/common/bookList/bookList";

const Library = ({ library }) => {
  const [books, setBooks] = useState(null);
  console.log("library");
  console.log(library);
  useEffect(() => {
    const getBooks = async () => {
      const response = await library.loadBooks();
      console.log(response);
      setBooks(response.data);
    };
    getBooks();
  }, []);
  return (
    <div>
      {books !== null ? (
        <BookList books={books} state="library" />
      ) : (
        <h1>내 서재 비어있음</h1>
      )}
    </div>
  );
};

export default Library;
