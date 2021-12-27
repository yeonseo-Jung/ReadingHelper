module.exports = (sequelize, DataTypes) => {
  let library = sequelize.define(
    "library",
    {
      book_title: {
        field: "book_title",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      book_thumbnail: {
        field: "book_thumbnail",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      book_isbn: {
        field: "book_isbn",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      read_date: {
        field: "read_date",
        type: DataTypes.DATE,
      },
      memo: {
        field: "memo",
        type: DataTypes.STRING,
      },
      user_id: {
        field: "user_id",
        type: DataTypes.BIGINT,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "library",
      timestamps: false,
    }
  );
  return library;
};
