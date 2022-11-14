/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { requiredField } = require("../controllers/book");
const { createBook, getAllBooks, getBook, addComment, deleteBook, deleteAllBooks } = require("../middlewares/crud");

module.exports = function (app, myDataBase) {

  app.route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      getAllBooks(myDataBase, (err, books) => {
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        if (err)
          res.status(200).json(err);
        if (books)
          res.status(200).json(books);
      });
    })

    .post(requiredField('title'), function (req, res) {

      createBook(req.body.title, myDataBase, (err, data) => {
        if (err)
          res.status(200).json(err);
        if (data)
          res.status(200).json(data);
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      deleteAllBooks(myDataBase, (err, data) => {
        console.log(err);
        if (err)
          res.status(200).json(err);
        if (data)
          res.status(200).send(data);
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      getBook(req.params.id, myDataBase, (err, book) => {
        if (err)
          res.status(200).send(err);
        if (book)
          res.status(200).json(book);
      })
    })

    .post(requiredField('comment'), function (req, res) {
      //json res format same as .get
      addComment(req.params.id, req.body.comment, myDataBase, (err, book) => {
        if (err)
          res.status(200).send(err);
        if (book)
          res.status(200).json(book);
      })
    })

    .delete(function (req, res) {
      //if successful response will be 'delete successful'
      deleteBook(req.params.id, myDataBase, (err, data) => {
        if (err)
          res.status(200).send(err);
        if (data)
          res.status(200).send(data);
      })
    });
  //404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

};
