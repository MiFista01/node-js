const db = require("./connection/database")
let Category = require("./tables/categories")
Category.sync()
let Author = require("./tables/authors")
Author.sync()
let Book = require("./tables/book")
Book.sync()
Book.belongsToMany(Author,{through:"Book_Author"})

// Category.create({
//     category_name:"Horror"
// })