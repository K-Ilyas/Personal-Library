
const { ObjectId } = require("mongodb");

// create book middleware
async function createBook(title, myDataBase, done) {
    try {

        const book = await myDataBase.insertOne({ title: title, commentcount: 0, comments: [] });
        const findBook = await myDataBase.findOne({ _id: book.insertedId }, { projection: { commentcount: 0, comments: 0 } });
        done(null, { title: findBook.title, '_id': findBook._id });
    } catch (e) {
        // catch errors
        done(e);
    }
}


// get All books
async function getAllBooks(myDataBase, done) {
    try {
        const books = await myDataBase.find({}, { projection: { comments: 0 } }).toArray();
        done(null, books);
    } catch (e) {
        // catch errors
        done(e);
    }
}

// get A specific book with id
async function getBook(_id, myDataBase, done) {
    try {
        const book = await myDataBase.findOne({ _id: ObjectId(_id) });
        if (book == null)
            done('no book exists');
        else
            done(null, book);
    } catch (e) {
        // catch errors
        done('no book exists');
    }
}

// add comment to a specific book
async function addComment(_id, comment, myDataBase, done) {
    try {
        const book = await myDataBase.findOne({ _id: ObjectId(_id) });
        if (book == null)
            done('no book exists');
        else {
            const updatedBook = await myDataBase.findOneAndUpdate({ _id: ObjectId(_id) }, { $inc: { commentcount: 1 }, $push: { comments: comment } }, { returnDocument: 'after' });
            done(null, updatedBook.value);
        }
    } catch (e) {
        // catch errors
        done('no book exists');
    }
}

// delete a specific book
async function deleteBook(_id, myDataBase, done) {
    try {
        const book = await myDataBase.findOneAndDelete({ _id: ObjectId(_id) });
        if (book.value == null)
            done('no book exists');
        else {
            done(null, 'delete successful');
        }
    } catch (e) {
        // catch errors
        done('no book exists');
    }
}

// delete all the books from the collection
async function deleteAllBooks(myDataBase, done) {
    try {
        const book = await myDataBase.deleteMany();
        done(null, 'complete delete successful');
    } catch (e) {
        // catch errors
        done(e);
    }
}

exports.createBook = createBook;
exports.getAllBooks = getAllBooks;
exports.getBook = getBook;
exports.addComment = addComment;
exports.deleteBook = deleteBook;
exports.deleteAllBooks = deleteAllBooks;