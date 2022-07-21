const bcrypt = require('bcrypt');
const User = require('../../models/Users');
const Book = require('../../models/Books');
const Category = require('../../models/Category');

const signUp = (req,res) => {
    const {name,email,password,confirmPassword,image} = req.body;

    try {
        if(!name || !email || !password || !confirmPassword || !image) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        const user = new User({
            name,
            email,
            password: hash,
            image
        });

        user.save()
            .then(() => {
                res.status(201).json({
                    message: 'User created successfully',
                    user
                });
            });
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

const login = (req,res) => {
    const {email,password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }

        User.findOne({email})
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        message: 'User does not exist'
                    });
                }

                const isMatch = bcrypt.compareSync(password,user?.password);

                if (!isMatch) {
                    return res.status(400).json({
                        message: 'Invalid password'
                    });
                }

                res.status(200).json({
                    message: 'User logged in successfully',
                    user
                });
            });
    }catch (e){
        res.status(400).json({
            message: e.message
        })
    }
}

const createBook = async (req,res) => {
    const {title,author,description,image,category,createdBy} = req.body;

    try {
        if (!title || !author || !description || !image) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }

        const book = new Book({
            title,
            author,
            description,
            image,
            category,
            createdBy
        });

        await book.save();
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

const deleteBook = async (req,res) => {
    const {id} = req.params;

    try {
        await Book.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Book deleted successfully'
        });
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

const addCategory = async (req,res) => {
    const {name} = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }

        const category = new Category({
            name
        });

        await category.save();

        res.status(200).json({
            message: 'Category created successfully'
        });
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

const listAllBooks = async (req,res) => {
    const query = req.query.createdBy;
    try {
        const books = await Book.find({createdBy: query});

        res.status(200).json({
            message: 'Books fetched successfully',
            books
        });
    }catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

module.exports = {signUp,login,createBook,deleteBook,listAllBooks,addCategory};