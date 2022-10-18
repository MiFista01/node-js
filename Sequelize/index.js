const db = require("./connection/database")

const Category = require("./models/category");
const Author = require("./models/author");
const Book = require("./models/book"); 
const fun = require("./fun");
const Fun = require("./fun");
let category_fun = new Fun(Category);
let book_fun = new Fun(Book);
let author_fun = new Fun(Author);

