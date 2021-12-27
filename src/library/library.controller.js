const LibraryService = require("./library.service");

exports.getBooks = async (req, res, next) => {
  try {
    const result = await LibraryService.getBooks();
    res.send(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.saveBook = async (req, res, next) => {
  try {
    const result = await LibraryService.saveBook(req.body);
    res.send("success");
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.deleteBook = async (req, res, next) => {
  try {
    console.log(req.body.bookId);
    const result = await LibraryService.deleteBook(req.body.bookId);
    res.send("success");
  } catch (err) {
    return res.status(500).json(err);
  }
};
