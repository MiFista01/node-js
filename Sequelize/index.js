const db = require("./connection/database")
const fs = require('fs');

const Category = require("./models/category");
const Author = require("./models/author");
const Book = require("./models/book"); 
const Fun = require("./fun");
// Book.belongsToMany(Author, {through:"BookAuthor"});
// Book.belongsToMany(Category, {through:"BookCategory"});
// db.sync()
// let category_fun = new Fun(Category);
// let book_fun = new Fun(Book);
// let author_fun = new Fun(Author);

let rawdata = fs.readFileSync('books_data.json');
let books = JSON.parse(rawdata);

// author_fun.getOne({ id: 1 }).then(function(result){console.log(result)})
let books_data = []
books.forEach(element => {
    let book_data = {}
    if(element.title != undefined){
        book_data.title = element.title
    }
    if(element.isbn != undefined){
        book_data.isbn = element.isbn
    }
    if(element.pageCount!= undefined){
        book_data.page_count = element.pageCount
    }
    if(element.publishedDate != undefined){
        book_data.published_date = element.publishedDate.date
    }
    if(element.thumbnailUrl != undefined){
        book_data.thumnbnail_URL = element.thumbnailUrl
    }
    if(element.shortDescription != undefined){
        book_data.short_description = element.shortDescription
    }
    if(element.longDescription != undefined){
        book_data.long_description = element.longDescription
    }
    if(element.status != undefined){
        book_data.status = element.status
    }
    if(element.authors != undefined){
        book_data.authors = element.authors
    }
    if(element.categories != undefined){
        book_data.categories = element.categories
    }
    books_data.push(book_data)
});

async function create(data){
    let unq = new Set(data)
    let authors = new Set()
    let categories = new Set()
    unq.forEach(element => {
        Book.create(element).
        then(res =>{console.log(res);}).
        catch(err =>{console.log(err);})
    });
    console.log(books_data.length)
}
