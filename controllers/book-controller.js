const { UserModel, BookModel } = require('../models');


exports.getAllBooks = async (req, res) => {
    let books = await BookModel.find();
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Books not Found!",
        });
    }
    return res.status(200).json({
        success: true,
        data: books,
    });
};

exports.getBookByID = async (req, res) => {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found!"
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");
    console.log(users);
}

exports.addNewBook = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data was Provided"
        });
    }
    await BookModel.create(data);
    return res.status(200).json({
        success: true,
        message: "Book Added Successfully!"
    });
}

exports.updateBookByID = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = BookModel.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book not found!"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Details Updated Successfully!"
    });
}
// module.exports = { getAllBooks, getBookByID };