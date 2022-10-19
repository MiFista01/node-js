const db = require("./connection/database")
const fs = require('fs');

const Category = require("./models/category");
const Author = require("./models/author");
const Book = require("./models/book"); 
const Fun = require("./fun");
let category_fun = new Fun(Category);
let book_fun = new Fun(Book);
let author_fun = new Fun(Author);

let rawdata = fs.readFileSync('books_data.json');
let books = JSON.parse(rawdata);
// await author_fun.getOne({ id: 1 })

// author_fun.getOne({ id: 1 }).then(function(result){console.log(result)})
let books_data = []
books.forEach(element => {
    let book_data = {}
    if (isNumberObject(element._id)){
        book_data.id = element._id
    }else{
        book_data.id = element._id.$oid
    }
    
    book_data.title = element.title
    book_data.isbn = element.isbn
    book_data.page_count = element.pageCount
    book_data.published_date = element.publishedDate.$date
    book_data.thumnbnail_URL = element.thumbnailUrl
    book_data.short_description = element.shortDescription
    book_data.long_description = element.longDescription
    book_data.status = element.status
    books_data.push(book_data)
});


console.log(books_data)

