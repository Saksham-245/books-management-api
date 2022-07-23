const {signUp,login,createBook,listAllBooks,deleteBook,addCategory} = require("../../controllers/admin/admin");
const router = require('express').Router();

router.post('/login', login);
router.post('/create-book/', createBook);
router.get('/get-books/',listAllBooks);
router.delete('/delete-book/:id',deleteBook);
router.post('/add-category/',addCategory);

module.exports = router;