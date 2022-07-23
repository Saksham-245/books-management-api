const bcrypt = require('bcrypt');
const User = require('../../models/Users');
const Book = require('../../models/Books');
const Category = require('../../models/Category');

const login = (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(400).json({
				message: 'Please fill all the fields',
			});
		}

		User.findOne({ email }).then((user) => {
			if (!user) {
				return res.status(400).json({
					message: 'User does not exist',
				});
			}

			const isMatch = bcrypt.compareSync(password, user?.password);

			if (!isMatch) {
				return res.status(400).json({
					message: 'Invalid password',
				});
			}

			res.status(200).json({
				message: 'User logged in successfully',
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					image: user.image,
					isAdmin: user.isAdmin,
				},
			});
		});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

const createBook = async (req, res) => {
	const { title, author, description, image, category, createdBy } = req.body;

	try {
		if (!title || !author || !description || !image) {
			return res.status(400).json({
				message: 'Please fill all the fields',
			});
		}

		const book = new Book({
			title,
			author,
			description,
			image,
			category,
			createdBy,
		});

		await book
			.save()
			.then((book) => {
				res.status(200).json({
					message: 'Book created successfully',
					book,
				});
			})
			.catch((e) => {
				res.status(400).json({
					message: e.message,
				});
			});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

const deleteBook = async (req, res) => {
	const { id } = req.params;

	try {
		await Book.findByIdAndDelete(id);

		res.status(200).json({
			message: 'Book deleted successfully',
		});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

const addCategory = async (req, res) => {
	const { name } = req.body;

	try {
		if (!name) {
			return res.status(400).json({
				message: 'Please fill all the fields',
			});
		}

		const category = new Category({
			name,
		});

		await category.save();

		res.status(200).json({
			message: 'Category created successfully',
		});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

const listAllBooks = async (req, res) => {
	const query = req.query.createdBy;
	try {
		const books = await Book.find({ createdBy: query });

		res.status(200).json({
			message: 'Books fetched successfully',
			books,
		});
	} catch (e) {
		res.status(400).json({
			message: e.message,
		});
	}
};

module.exports = { login, createBook, deleteBook, listAllBooks, addCategory };
