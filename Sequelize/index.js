const db = require("./connection/database")
const fs = require('fs');

const Category = require("./models/category");
const Author = require("./models/author");
const Book = require("./models/book"); 
const BookCategory = require("./models/book_categories");
const BookAuthor = require("./models/book_author");
// db.sync({force:true})

// let rawdata = fs.readFileSync('books_data.json');
// let books = JSON.parse(rawdata);

// let books_data = []
// books.forEach(element => {
//     let book_data = {}
//     if(element.title != undefined){
//         book_data.title = element.title
//     }
//     if(element.isbn != undefined){
//         book_data.isbn = element.isbn
//     }
//     if(element.pageCount!= undefined){
//         book_data.page_count = element.pageCount
//     }
//     if(element.publishedDate != undefined){
//         book_data.published_date = element.publishedDate.date
//     }
//     if(element.thumbnailUrl != undefined){
//         book_data.thumnbnail_URL = element.thumbnailUrl
//     }
//     if(element.shortDescription != undefined){
//         book_data.short_description = element.shortDescription
//     }
//     if(element.longDescription != undefined){
//         book_data.long_description = element.longDescription
//     }
//     if(element.status != undefined){
//         book_data.status = element.status
//     }
//     if(element.authors != undefined){
//         book_data.authors = element.authors
//     }
//     if(element.categories != undefined){
//         book_data.categories = element.categories
//     }
//     books_data.push(book_data)
// });
// async function create(data){
//     for(let i of data){
//         let book_datas = Object.assign({}, i);
//         delete book_datas.authors
//         delete book_datas.categories
//         let book = await Book.findOrCreate({where:{title:i.title},defaults:book_datas})
//         for(let j of i.authors){
//             let last_name = j.split(' ').slice(-1).join(' ');
//             var name = j.split(' ').slice(0, -1).join(' ');
//             let author = await Author.findOrCreate({where:{name:name},defaults:{name:name,last_name:last_name}})
//             BookAuthor.findOrCreate({where:{id_book:book[0].dataValues.id, id_author:author[0].dataValues.id},defaults:{id_book:book[0].dataValues.id, id_author:author[0].dataValues.id}})
//         }
//         for(let j of i.categories){
//             let category = await Category.findOrCreate({where:{name:j},defaults:{name:j}})
//             BookCategory.findOrCreate({where:{id_book:book[0].dataValues.id, id_category:category[0].dataValues.id},defaults:{id_book:book[0].dataValues.id, id_category:category[0].dataValues.id}})

//         }
//     }
// }
// create(books_data)
async function get_Books (count = 0, order = "ASC"){
    var books
    if (count == 0){
        books = await Book.findAll(
            {
                order:[
                    ["id",order],
                ],
                attributes: [
                    "id",
                    "title",
                    "isbn",
                    "page_count",
                    [db. fn("date_format", db.col("published_date"), "%d-%m-%Y %H:%i:%s"), "published_date"],
                    "thumnbnail_URL",
                    "short_description",
                    "long_description",
                    "status"
                    ]
            }
        )
    }else{
        books = await Book.findAll(
            {
                order:[
                    ["id",order]
                ],
                limit : count,
                attributes: [
                    "id",
                    "title",
                    "isbn",
                    "page_count",
                    [db. fn("date_format", db.col("published_date"), "%d-%m-%Y %H:%i:%s"), "published_date"],
                    "thumnbnail_URL",
                    "short_description",
                    "long_description",
                    "status"
                    ]
            }
        )
    }
    let array_books = []
    for (let i of books){
        let book = []
        book.push(i.dataValues)
        let id_categories = await BookCategory.findAll({
            attributes:[["id_category","id"]],
            where:{id_book:i.id}
        })
        let categories = [];
        for (let j of id_categories){
            let category = await Category.findOne({where:{id:j.id}})
            categories.push(category.name)
        }
        let id_authors = await BookAuthor.findAll({
            attributes:[["id_author","id"]],
            where:{id_book:i.id}})
        let authors = [];
        for (let j of id_authors){
            let author = await Author.findOne({where:{id:j.dataValues.id}})
            authors.push(author.name + " "+ author.last_name)
        }
        book.push(categories)
        book.push(authors)
        delete book[0].id
        array_books.push(book)
    }
    return array_books
}

async function post(){
    let books = await get_Books(1)
    var express = require('express');
    var app = express();
    // set the view engine to ejs
    app.set('view engine', 'ejs');

    // index page
    app.get('/', function(req, res) {
        res.render('pages/index',{books:books});
    });

    app.listen(3000);
    console.log('Server is listening on port 8080');
}
post()
