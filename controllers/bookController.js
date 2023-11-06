const { v4: uuidv4 } = require('uuid');
const utilty = require('../utility/utility')
const connectToDB = require('../config/db');
const { type } = require('os');

const welcomeMessage = (req, res) => {
    res.json({ message: 'Welcome to the Express App!' });
};


const insertBook = async (req, res) => {
    
    //check req body format
    if (
        !utilty.isKeyExistWithType("author", "string", req.body)
        || !utilty.isKeyExistWithType("title", "string", req.body)
        || !utilty.isKeyExistWithType("summary", "string", req.body)
    ) {
        return res.status(422).json({ message: "Incomplete request body, either author or title or summary field missing or defined with wrong type." })

    }

    const newBook = {
        bookId: uuidv4(),
        author: req.body.author,
        title: req.body.title,
        summary: req.body.summary
    }

    try{
        const db = await connectToDB();
        const books = db.collection('Books');
        await books.insertOne(newBook)
        res.status(200).json({ message: "Successfully inserted book." });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching data.',});
    }
    
};
const getBooks = async (req, res) => {
    try{
        const db = await connectToDB();
        const books = db.collection('Books');
        const booksOut = await books.find({},{projection: { _id: 0, author: 0, summary: 0 }} ).toArray();
        
        res.status(200).json({books: booksOut});
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching books.',});
    }
};
const getBook = async (req, res) => {
    
    const bookId = req.params.bookId;

    if( !bookId){
        return res.status(400).json({ message: 'Please include bookId in params.' });
    }

    try{
        const db = await connectToDB();
        const books = db.collection('Books');
        const doc = await books.findOne({"bookId": bookId}, {projection: { _id: 0 }})
        if(!doc){
            return res.status(400).json({message: "No Entry exist for bookId: " + bookId})
        }
        res.status(200).json(doc);
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching book with bookId: ' + bookId,});
    }
    
};
const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;

    if( !bookId){
        return res.status(400).json({ message: 'Please include bookId in params.' });
    }

    try{
        const db = await connectToDB();
        const books = db.collection('Books');
        const report = await books.deleteOne({"bookId": bookId})
        if(report.deletedCount == 0){
            return res.status(400).json({message: "No Entry Exist for bookId: " + bookId})
        }
        res.status(200).json({message: `Successfully deleted book with bookId: ${bookId}`});
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while deleting data.',});
    }
};
const updateBook = async (req, res) => {
    const bookId = req.params.bookId;
    //requestbody check
    if( !bookId){
        return res.status(400).json({ message: 'Please include bookId in params.' });
    }
   
    let bookInfo = {}

    let isKeyExist = false;

    if("author" in req.body) {
        if(typeof(req.body["author"]) != "string") return res.status(422).json({message: "Wrong type for author field."});
        bookInfo.author = req.body.author;
        isKeyExist = true;
    }
    if("title" in req.body) {
        if(typeof(req.body["title"]) != "string") return res.status(422).json({message: "Wrong type for title field."});
        bookInfo.title = req.body.title;
        isKeyExist = true;
    }
    if("summary" in req.body){
        if(typeof(req.body["summary"]) != "string") return res.status(422).json({message: "Wrong type for summary field."});
         bookInfo.summary = req.body.summary;
         isKeyExist = true;
        }

   if(!isKeyExist)  return res.status(422).json({message: "No field specified in request body."});

    try{
        const db = await connectToDB();
        const books = db.collection('Books');
        await books.updateOne({"bookId": bookId}, {$set: bookInfo })
        res.status(200).json({message: `Successfully updated books with bookId: ${bookId}`});

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while updating data.',});
    }
};


module.exports = {
    insertBook, getBook, getBooks, updateBook, deleteBook, welcomeMessage
}