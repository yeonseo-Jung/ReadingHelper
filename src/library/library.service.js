const Library = require("../models").library;

exports.getBooks = async () => {
  try {
    const books = await Library.findAll({ raw: true });
    return books;
  } catch (error) {
    throw error;
  }
};
exports.saveBook = async (params) => {
  try {
    console.log(params);
    const book = await Library.create(params);
    console.log(book instanceof Library);
  } catch (error) {
    throw error;
  }
};
exports.deleteBook = async (id) => {
  try {
    console.log(id);
    const book = await Library.destroy({ where: { id: id } });
    console.log(book instanceof Library);
  } catch (error) {
    throw error;
  }
};
