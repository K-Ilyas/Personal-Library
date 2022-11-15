/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const api = require('../routes/api');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function (done) {
  //   chai.request(server)
  //     .get('/api/books')
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  let _id = 0;
  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({
            title: "In Search of Lost Time by Marcel Proust"
          }).end(function (err, res) {
            _id = res.body._id;
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.body.title, "In Search of Lost Time by Marcel Proust", "title must be equal to In Search of Lost Time by Marcel Proust");
            assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          })

      });

      test('Test POST /api/books with no title given', function (done) {
        chai
          .request(server)
          .post("/api/books")
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "missing required field title", "the response must be missing required field title");
            done();
          })
      });
    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .get(`/api/books/129hdgt12`)
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "no book exists", "the response must be no book exists")
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .get(`/api/books/${_id}`)
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.isArray(res.body.comments, 'comment property sholud be an arrray');
            assert.strictEqual(res.body._id, _id, `id must be equal to ${_id}`);
            assert.strictEqual(res.body.title, "In Search of Lost Time by Marcel Proust", "title must be equal to In Search of Lost Time by Marcel Proust");
            assert.property(res.body, "commentcount", "Book should contain commentcount");
            done();
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        chai.request(server)
          .post(`/api/books/${_id}`)
          .send({ comment: "This is an intresting book." })
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.isArray(res.body.comments, 'comment property sholud be an arrray');
            assert.include(res.body.comments, "This is an intresting book.", "the new comment is exist in the array");
            assert.strictEqual(res.body._id, _id, `id must be equal to ${_id}`);
            assert.strictEqual(res.body.title, "In Search of Lost Time by Marcel Proust", "title must be equal to In Search of Lost Time by Marcel Proust");
            assert.property(res.body, "commentcount", "Book should contain commentcount");
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai.request(server)
          .post(`/api/books/${_id}`)
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "missing required field comment", "the response must be missing required field comment");
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai.request(server)
          .post(`/api/books/76512hhd56`)
          .send({ comment: "This is an intresting book." })
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "no book exists", "the response must be no book exists")
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .delete(`/api/books/${_id}`)
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "delete successful", "the response must be delete successful")
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai.request(server)
          .delete(`/api/books/76512hhd56`)
          .end(function (err, res) {
            assert.equal(res.status, 200, "Response status should be 200");
            assert.strictEqual(res.text, "no book exists", "the response must be no book exists")
            done();
          });
      });

    });

  });

});
